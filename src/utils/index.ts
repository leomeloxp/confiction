const schemaEntryKeys = ['doc', 'default'];

export const isSchemaEntry = (obj: SchemaEntry | {} = {}): obj is SchemaEntry => {
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

export const parseEntries = (schema: { [k: string]: SchemaEntry }): [string, SchemaEntry][] => {
  return Object.entries(schema).map(([key, value]) => {
    if (isSchemaEntry(value)) {
      return [key, value.default];
    }
    throw new Error('Schema not in valid format. Configs must be top level only');
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface SchemaEntry<T = any> {
  doc: string;
  default: T;
  sensitive?: boolean;
  type?: string;
}

export type Schema<T> = {
  [K in keyof T]: SchemaEntry<T[K]>;
};
