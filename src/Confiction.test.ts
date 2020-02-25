import Cookies, { Cookie } from 'universal-cookie';
import { Confiction } from './Confiction';

const schema = {
  stringConfig: {
    doc: 'A string config value',
    format: 'string',
    default: 'A string',
  },
  numberConfig: {
    doc: 'A number config value',
    format: 'number',
    default: 42,
  },
  sensitiveConfig: {
    doc: 'A secret value',
    format: 'string',
    sensitive: true,
    default: 'secret',
  },
};

const invalidSchema = {
  stringConfig: {
    doc: 'A string config value',
    format: 'string',
    default: 42,
  },
  numberConfig: {
    doc: 'A number config value',
    format: 'number',
    default: 'A string',
  },
};

const configOptionsToLoad = {
  stringConfig: 'Another string',
  numberConfig: 23,
};

type Config = {
  [k in keyof typeof schema]: typeof schema[k]['default'];
};

jest.mock('universal-cookie', () =>
  jest.fn().mockImplementation(() => {
    const cookieJar: { [key: string]: Cookie } = {};
    const mock = {
      get: (key: string): unknown => cookieJar[key],
      set: (key: string, value: unknown): void => {
        cookieJar[key] = value;
      },
    };
    return mock;
  }),
);

describe('Confiction', () => {
  test('should create a config store', () => {
    const config = new Confiction<Config>(schema);
    expect(config).toBeInstanceOf(Confiction);
  });

  test('should return valid config values', () => {
    const config = new Confiction<Config>(schema);
    expect(config.get('stringConfig')).toEqual(schema.stringConfig.default);
    expect(config.get('numberConfig')).toEqual(schema.numberConfig.default);
  });

  test('should pass validation with a valid schema', () => {
    const config = new Confiction<Config>(schema);
    expect(config.validate()).toBe(true);
    expect(config.validate({ allow: 'strict' })).toBe(true);
  });

  test('should allow value to be get/set from cookies', () => {
    // Reset mock stats so tests are clean
    (Cookies as jest.Mock).mockClear();
    const config = new Confiction<Config>(schema, { useCookies: true, configHierarchy: ['cookies', 'local'] });
    config.setToCookie('numberConfig', 23);
    expect(Cookies).toBeCalledTimes(1);
    const value = config.get('numberConfig');
    expect(value).toEqual(23);
    expect(config.get('stringConfig')).toEqual(schema.stringConfig.default);
  });

  test('should fail validation with an invalid schema', () => {
    const config = new Confiction(invalidSchema);
    const validation = (): boolean => config.validate({ allow: 'strict' });
    expect(config.validate()).toBe(false);
    expect(validation).toThrowError();
  });

  test('should return the schema object', () => {
    const config = new Confiction<Config>(schema);
    expect(config.getSchema()).toStrictEqual(schema);
  });

  test('should return the schema as JSON string', () => {
    const config = new Confiction<Config>(schema);
    expect(config.getSchemaString()).toStrictEqual(JSON.stringify(schema));
  });

  test('should return all properties correctly', () => {
    const config = new Confiction<Config>(schema);
    const expectedProperties: { [k: string]: unknown } = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(schema)) {
      expectedProperties[key] = value.default;
    }

    expect(JSON.stringify(config.getProperties())).toEqual(JSON.stringify(expectedProperties));
  });

  test('should correctly report the presence of a value in the config store', () => {
    const config = new Confiction<Config>(schema);

    expect(config.has('stringConfig')).toBe(true);
    expect(config.has('numberConfig')).toBe(true);
    expect(config.has('someOtherConfig')).toBe(false);
  });

  test('should allow values to be loaded in after instantiation', () => {
    const config = new Confiction<Config>(schema);
    config.load(configOptionsToLoad);

    expect(config.get('numberConfig')).toEqual(configOptionsToLoad.numberConfig);
    expect(config.get('stringConfig')).toEqual(configOptionsToLoad.stringConfig);
    expect(config.validate()).toBe(true);
  });
  test('should allow us to reset config values to their default', () => {
    const config = new Confiction<Config>(schema);
    config.load(configOptionsToLoad);

    expect(config.get('numberConfig')).toEqual(configOptionsToLoad.numberConfig);
    config.reset('numberConfig');
    expect(config.get('numberConfig')).toEqual(schema.numberConfig.default);
  });

  test('should allow us to set individual values to the config store', () => {
    const config = new Confiction<Config>(schema);
    const overridingNumber = 16;
    config.set('numberConfig', overridingNumber);
    expect(config.get('numberConfig')).toBe(overridingNumber);
  });

  test('should return a custom string from `toString` method', () => {
    const config = new Confiction<Config>(schema);
    const expectedProperties: { [k: string]: unknown } = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(schema)) {
      expectedProperties[key] = (value as typeof schema['sensitiveConfig']).sensitive ? '******' : value.default;
    }
    expect(config.toString()).toBe(JSON.stringify(expectedProperties));
  });
});
