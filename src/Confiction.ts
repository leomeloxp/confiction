import { ConfigValue, isConfigValue, isSchemaEntry, Schema } from './utils';

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
  private schema: Schema = {};

  /**
   *Creates an instance of Confiction.
   * @param {Schema} schema A Schema object used to describe the configuration options.
   * @memberof Confiction
   */
  constructor(schema: Schema) {
    this.schema = schema;
    this.default();
  }

  /**
   * Reset the config values to those provided as the `default` key in the schema object.
   * @memberof Confiction
   */
  default(): void {
    this.config = new Map();
    Object.entries(this.schema).forEach(([key, value]) => {
      if (isSchemaEntry(value)) {
        this.config.set(key, value.default);
      }
    });
  }

  /**
   * Returns the value for the config stored as the supplied key.
   * @param {string} key The key of the desired config value.
   * @returns {(ConfigValue | undefined)}
   * @memberof Confiction
   */
  get(key: string): ConfigValue | undefined {
    const value = this.config.get(key);
    return isConfigValue(value) ? value : undefined;
  }

  /**
   * Returns all config entries as a {key: value} formatted object.
   * @returns {{ [key: string]: ConfigValue }}
   * @memberof Confiction
   */
  getProperties(): { [key: string]: ConfigValue } {
    return Object.fromEntries(this.config.entries());
  }

  /**
   * Returns the schema as a JSON string.
   * @returns {string}
   * @memberof Confiction
   */
  getSchemaString(): string {
    return JSON.stringify(this.getProperties());
  }

  /**
   * Returns the schema as a standard object.
   * @returns {Schema}
   * @memberof Confiction
   */
  getSchema(): Schema {
    return this.schema;
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
    return JSON.stringify(
      Object.fromEntries(
        Array.from(this.config.entries()).map(([key, value]) => {
          const parsedValue = this.schema.key.sensitive ? '******' : value;
          return [key, parsedValue];
        }),
      ),
    );
  }

  /**
   * Validates the current config values against the schema definition.
   * @param {({ allow: 'warn' | 'strict' })} [{ allow }={ allow: 'warn' }]
   * @returns {(boolean | never)}
   * @memberof Confiction
   */
  validate({ allow }: { allow: 'warn' | 'strict' } = { allow: 'warn' }): boolean | never {
    return !Array.from(this.config.entries()).some(([key, value]) => {
      const { type } = this.schema[key];
      // eslint-disable-next-line valid-typeof
      if (typeof type === 'string' && typeof value !== type) {
        if (allow === 'warn' && global.console) {
          // eslint-disable-next-line no-console
          console.warn(`Config '${key}' does not match type '${type}'`);
        } else if (allow === 'strict') {
          throw new Error(`Config '${key}' does not match type '${type}'`);
        }
        return true;
      }
      return false;
    });
  }
}
