import Cookie, { CookieSetOptions } from 'universal-cookie';
import {
  BaseConfigSchema,
  ConfictionOptions,
  ConfigValidateOptions,
  parseEntries,
  SafeConfigSchema,
  Schema,
} from './utils';

const defaultOptions: ConfictionOptions = {
  cookiesPrefix: 'CONFICTION',
  useCookies: true,
  configHierarchy: ['local', 'cookies'],
};

/**
 * Confiction, browser based configuration manager.
 * @export
 * @class Confiction
 */
export class Confiction<ConfigSchema extends BaseConfigSchema> {
  /**
   * Map holding the parsed config values.
   * @private
   * @type {Map<keyof ConfigSchema, ConfigSchema[keyof ConfigSchema]>}
   * @memberof Confiction
   */
  private config: Map<keyof ConfigSchema, ConfigSchema[keyof ConfigSchema]> = new Map();

  /**
   * Options used to control behaviour of the config store.
   * @private
   * @type {ConfictionOptions}
   * @memberof Confiction
   */
  private options: ConfictionOptions;

  /**
   * Schema definition for the configuration map.
   * @private
   * @type {Schema<ConfigSchema>}
   * @memberof Confiction
   */
  private schema: Schema<ConfigSchema>;

  /**
   * Helper tool used to get/set values from browser cookies.
   * @private
   * @type {Cookie}
   * @memberof Confiction
   */
  private readonly cookieParser: Cookie = new Cookie();

  /**
   * Creates an instance of Confiction.
   * @param {Schema<ConfigSchema>} schema A Schema object used to describe the configuration options.
   * @memberof Confiction
   */
  constructor(schema: Schema<ConfigSchema>, options: Partial<ConfictionOptions> = {}) {
    this.schema = schema;
    this.options = { ...defaultOptions, ...options };
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
   *
   *
   * @param {keyof ConfigSchema} key The key of the desired config value.
   * @returns {ConfigSchema[keyof ConfigSchema]} The value stored in config for the supplied key.
   * @memberof Confiction
   */
  get(key: keyof ConfigSchema): ConfigSchema[keyof ConfigSchema] {
    const {
      options: { useCookies, configHierarchy },
    } = this;
    if (useCookies && configHierarchy[0] === 'cookies') {
      const cookieValue = this.getFromCookies(key);
      if (typeof cookieValue !== 'undefined') {
        return cookieValue;
      }
    }

    return this.config.get(key) as ConfigSchema[keyof ConfigSchema];
  }

  /**
   * Returns all config entries as a {key: value} formatted object.
   * @returns {ConfigSchema}
   * @memberof Confiction
   */
  getProperties(): ConfigSchema {
    const properties: ConfigSchema = {} as ConfigSchema;
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
  getSchema(): Schema<ConfigSchema> {
    return this.schema;
  }

  /**
   * Checks whether a config value is set in the config map.
   * @param {string} key
   * @returns {boolean}
   * @memberof Confiction
   */
  has(key: keyof ConfigSchema | string): boolean {
    return this.config.has(key);
  }

  /**
   * Loads an object into the config map, overriding any provided property.
   * @param {{ [key: string]: ConfigValue }} config
   * @memberof Confiction
   */
  load(config: ConfigSchema): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Object.entries<any>(config).forEach(([key, value]: [keyof ConfigSchema, ConfigSchema[keyof ConfigSchema]]) => {
      this.config.set(key, value);
    });
  }

  /**
   * Resets a given config property to its default value.
   * @param {string} key
   * @memberof Confiction
   */
  reset(key: keyof ConfigSchema): void {
    this.config.set(key, this.schema[key].default);
  }

  /**
   * Sets a value to a config key.
   * @param {string} key Key to store the config under.
   * @param {ConfigValue} value Value for the config property.
   * @memberof Confiction
   */
  set(key: keyof ConfigSchema, value: ConfigSchema[keyof ConfigSchema]): void {
    this.config.set(key, value);
  }

  /**
   * Sets a config value to the user's cookies.
   * @param {keyof ConfigSchema} key
   * @param {ConfigSchema[keyof ConfigSchema]} value
   * @memberof Confiction
   */
  setToCookie(key: keyof ConfigSchema, value: ConfigSchema[keyof ConfigSchema], options?: CookieSetOptions): void {
    this.cookieParser.set(`${this.options.cookiesPrefix}_${key}`, value, options);
  }

  /**
   * Returns a string representation of this object.
   * @returns {string}
   * @memberof Confiction
   */
  toString(): string {
    const properties: SafeConfigSchema<ConfigSchema> = {} as SafeConfigSchema<ConfigSchema>;
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

  private getFromCookies(key: keyof ConfigSchema): ConfigSchema[keyof ConfigSchema] | undefined {
    return this.cookieParser.get<ConfigSchema[keyof ConfigSchema]>(`${this.options.cookiesPrefix}_${key}`);
  }
}
