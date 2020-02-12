import { ConfigValidateOptions, parseEntries, Schema } from './utils';

type ConfigValue = unknown;

type UnknownSchema = { [k: string]: ConfigValue };

/**
 * Confiction, browser based configuration manager.
 * @export
 * @class Confiction
 */
export class Confiction {
  /**
   * Map holding the parsed config values.
   * @private
   * @type {Map<string, ConfigValue>}
   * @memberof Confiction
   */
  private config: Map<string, ConfigValue> = new Map();

  /**
   * Schema definition for the configuration map.
   * @private
   * @type {Schema}
   * @memberof Confiction
   */
  private schema: Schema<UnknownSchema> = {};

  /**
   *Creates an instance of Confiction.
   * @param {Schema} schema A Schema object used to describe the configuration options.
   * @memberof Confiction
   */
  constructor(schema: Schema<UnknownSchema>) {
    this.schema = schema;
    this.default();
  }

  /**
   * Reset the config values to those provided as the `default` key in the schema object.
   * @memberof Confiction
   */
  default(): void {
    this.config = new Map();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parseEntries(this.schema).forEach(([key, value]) => {
      this.config.set(key, value);
    });
  }

  /**
   * Returns the value for the config stored as the supplied key.
   * @param {K} key The key of the desired config value.
   * @returns {(T[K])} The value stored in config for the supplied key.
   * @memberof Confiction
   */
  get<T, K extends keyof T | any = string>(key: K): K extends keyof T ? T[K] : T {
    // @todo: figure out a better type for this map.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this.config as Map<any, any>).get(key) as K extends keyof T ? T[K] : T;
  }

  /**
   * Returns all config entries as a {key: value} formatted object.
   * @returns {{ [key: string]: ConfigValue }}
   * @memberof Confiction
   */
  getProperties(): { [key: string]: ConfigValue } {
    const properties: { [key: string]: ConfigValue } = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of this.config.entries()) {
      properties[key] = value;
    }
    return properties;
  }

  /**
   * Returns the schema as a JSON string.
   * @returns {string}
   * @memberof Confiction
   */
  getSchemaString(): string {
    return JSON.stringify(this.schema);
  }

  /**
   * Returns the schema as a standard object.
   * @returns {Schema}
   * @memberof Confiction
   */
  getSchema<T = UnknownSchema>(): Schema<T> {
    return this.schema as Schema<T>;
  }

  /**
   * Checks whether a config value is set in the config map.
   * @param {string} key
   * @returns {boolean}
   * @memberof Confiction
   */
  has(key: string): boolean {
    return this.config.has(key);
  }

  /**
   * Loads an object into the config map, overriding any provided property.
   * @param {{ [key: string]: ConfigValue }} config
   * @memberof Confiction
   */
  load(config: { [key: string]: ConfigValue }): void {
    Object.entries(config).forEach(([key, value]) => {
      this.config.set(key, value);
    });
  }

  /**
   * Resets a given config property to its default value.
   * @param {string} key
   * @memberof Confiction
   */
  reset(key: string): void {
    this.config.set(key, this.schema[key].default);
  }

  /**
   * Sets a value to a config key.
   * @param {string} key Key to store the config under.
   * @param {ConfigValue} value Value for the config property.
   * @memberof Confiction
   */
  set(key: string, value: ConfigValue): void {
    this.config.set(key, value);
  }

  /**
   * Returns a string representation of this object.
   * @returns {string}
   * @memberof Confiction
   */
  toString(): string {
    const properties: { [key: string]: ConfigValue } = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of this.config.entries()) {
      properties[key] = this.schema[key].sensitive ? '******' : value;
    }

    return JSON.stringify(properties);
  }

  /**
   * Validates the current config values against the schema definition.
   * @param {(ConfigValidateOptions)} [{ allow }={ allow: 'warn' }]
   * @returns {(boolean | never)}
   * @memberof Confiction
   */
  validate({ allow }: ConfigValidateOptions = { allow: 'warn' }): boolean | never {
    return !Array.from(this.config.entries()).some(([key, value]) => {
      const { format } = this.schema[key];
      // eslint-disable-next-line valid-typeof
      if (typeof format === 'string' && typeof value !== format) {
        if (allow === 'warn' && global.console) {
          // eslint-disable-next-line no-console
          console.warn(`Config '${key}' does not match type '${format}'`);
        } else if (allow === 'strict') {
          throw new Error(`Config '${key}' does not match type '${format}'`);
        }
        return true;
      }
      return false;
    });
  }
}
