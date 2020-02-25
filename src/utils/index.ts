const schemaEntryKeys = ['doc', 'default'];

export const isSchemaEntry = <T>(obj: SchemaEntry<T> | {} = {}): obj is SchemaEntry<T> => {
  const keys = Object.keys(obj);
  const hasRequiredKeys = schemaEntryKeys.every((key) => keys.includes(key));
  return (
    hasRequiredKeys &&
    'doc' in obj &&
    typeof obj.doc === 'string' &&
    'default' in obj &&
    typeof obj.default !== 'undefined'
  );
};

export const parseEntries = <T extends BaseConfigSchema>(schema: Schema<T>): [keyof T, T[keyof T]][] => {
  return Object.entries(schema).map(([key, value]) => {
    if (isSchemaEntry(value)) {
      return [key, value.default];
    }
    throw new Error('Schema not in valid format. Configs must be top level only');
  });
};

export interface SchemaEntry<T> {
  doc: string;
  default: T;
  sensitive?: boolean;
  format?: string;
}

export type BaseConfigSchema = {
  [k: string]: unknown;
};

export type SafeConfigSchema<T extends BaseConfigSchema> = {
  [K in keyof T]: T[K] | '******';
};

export type Schema<T> = {
  [K in keyof T]: SchemaEntry<T[K]>;
};

export interface ConfigValidateOptions {
  allow: 'warn' | 'strict';
}
