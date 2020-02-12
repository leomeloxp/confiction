import { Confiction as OriginalClass } from './Confiction';
import { Confiction } from './index';

const schema = {
  foo: {
    doc: 'A string config value',
    format: 'string',
    default: 'bar',
  },
};

describe('Library entry point', () => {
  test('should allow us to import packages from index.ts', () => {
    const config = new Confiction(schema);

    expect(config).toBeInstanceOf(OriginalClass);
  });
});
