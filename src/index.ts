const schemaEntryKeys = ['doc', 'default', 'sensitive', 'type'];

export const isConfigValue = (entry: ConfigValue | Schema | undefined): entry is ConfigValue =>
  ['string', 'number', 'boolean'].includes(typeof entry);

export const isSchemaEntry = (obj: SchemaEntry | {}): obj is SchemaEntry => {
  return (
    Object.keys(obj).every(key => schemaEntryKeys.includes(key)) &&
    'doc' in obj &&
    typeof obj.doc === 'string' &&
    'default' in obj &&
    ['string', 'number', 'boolean'].includes(typeof obj.default)
  );
};

export type ConfigValue = string | number | boolean;

export interface SchemaEntry {
  doc: string;
  default: ConfigValue;
  sensitive?: boolean;
  type?: string;
}

export interface Schema {
  [key: string]: SchemaEntry;
}

export default class Confiction {
  private config: Map<string, ConfigValue> = new Map();
  private schema: Schema = {};

  constructor(schema: Schema) {
    this.schema = schema;
    this.default();
  }

  default(): void {
    this.config = new Map();
    Object.entries(this.schema).forEach(([key, value]) => {
      if (isSchemaEntry(value)) {
        this.config.set(key, value.default);
      }
    });
  }

  get(key: string): ConfigValue | undefined {
    const value = this.config.get(key);
    return isConfigValue(value) ? value : undefined;
  }

  getProperties(): { [key: string]: ConfigValue } {
    return Object.fromEntries(this.config.entries());
  }

  getSchemaString(): string {
    return JSON.stringify(this.getProperties());
  }

  getSchema(): Schema {
    return this.schema;
  }

  has(key: string): boolean {
    return this.config.has(key);
  }

  load(config: { [key: string]: ConfigValue }): void {
    Object.entries(config).forEach(([key, value]) => {
      this.config.set(key, value);
    });
  }

  reset(key: string): void {
    this.config.set(key, this.schema[key].default);
  }

  set(key: string, value: ConfigValue): void {
    this.config.set(key, value);
  }

  toString(): string {
    return JSON.stringify(
      Object.fromEntries(
        Array.from(this.config.entries()).map(([key, value]) => {
          const parsedValue = this.schema.key.sensitive ? '******' : value;
          return [key, parsedValue];
        }),
      ),
    );
  }

  validate({ allow }: { allow: 'warn' | 'strict' } = { allow: 'warn' }): boolean | never {
    return Array.from(this.config.entries()).some(([key, value]) => {
      const { type } = this.schema[key];
      if (typeof type === 'string' && typeof value !== type) {
        if (allow === 'warn') {
          console && console.warn(`Config '${key}' does not match type '${type}'`);
        } else if (allow === 'strict') {
          throw new ValidationError(`Config '${key}' does not match type '${type}'`);
        }
      }
    });
  }
}

class ValidationError extends Error {}
