import { parseEntries } from '.';

const validSchemaEntries = {
  stringConfig: {
    doc: 'A string config value',
    format: 'string',
    default: 'A string',
  },
};

const invalidSchemaEntries = {
  stringConfig: {
    default: 'A string',
  },
};

describe('parseEntries', () => {
  test('should parse valid entries correctly', () => {
    const parsedEntries = parseEntries(validSchemaEntries);
    expect(JSON.stringify(parsedEntries)).toBe(
      JSON.stringify([['stringConfig', validSchemaEntries.stringConfig.default]]),
    );
  });
  test('should throw error on invalid entries', () => {
    const invalidParseAttempt = (): void => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      parseEntries(invalidSchemaEntries);
    };
    expect(invalidParseAttempt).toThrow(Error);
  });
});
