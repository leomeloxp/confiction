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
      expectedProperties[key] = value.default;
    }
    expect(config.toString()).toBe(JSON.stringify(expectedProperties));
  });
});
