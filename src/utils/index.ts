export const isConfigValue = (entry: ConfigValue | Schema | undefined): entry is ConfigValue =>
  ['string', 'number', 'boolean'].includes(typeof entry);

const schemaEntryKeys = ['doc', 'default', 'sensitive', 'type'];

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
