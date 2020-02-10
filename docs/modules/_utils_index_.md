[confiction](../README.md) › [Globals](../globals.md) › ["utils/index"](_utils_index_.md)

# External module: "utils/index"

## Index

### Interfaces

* [SchemaEntry](../interfaces/_utils_index_.schemaentry.md)

### Type aliases

* [Schema](_utils_index_.md#schema)

### Variables

* [schemaEntryKeys](_utils_index_.md#const-schemaentrykeys)

### Functions

* [isSchemaEntry](_utils_index_.md#const-isschemaentry)
* [parseEntries](_utils_index_.md#const-parseentries)

## Type aliases

###  Schema

Ƭ **Schema**: *object*

*Defined in [utils/index.ts:27](https://github.com/leomeloxp/confiction/blob/14cb15e/src/utils/index.ts#L27)*

#### Type declaration:

## Variables

### `Const` schemaEntryKeys

• **schemaEntryKeys**: *string[]* = ['doc', 'default', 'sensitive', 'type']

*Defined in [utils/index.ts:1](https://github.com/leomeloxp/confiction/blob/14cb15e/src/utils/index.ts#L1)*

## Functions

### `Const` isSchemaEntry

▸ **isSchemaEntry**(`obj`: [SchemaEntry](../interfaces/_utils_index_.schemaentry.md) | object): *obj is SchemaEntry*

*Defined in [utils/index.ts:3](https://github.com/leomeloxp/confiction/blob/14cb15e/src/utils/index.ts#L3)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`obj` | [SchemaEntry](../interfaces/_utils_index_.schemaentry.md) &#124; object | {} |

**Returns:** *obj is SchemaEntry*

___

### `Const` parseEntries

▸ **parseEntries**(`schema`: object): *[string, [SchemaEntry](../interfaces/_utils_index_.schemaentry.md)][]*

*Defined in [utils/index.ts:10](https://github.com/leomeloxp/confiction/blob/14cb15e/src/utils/index.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`schema` | object |

**Returns:** *[string, [SchemaEntry](../interfaces/_utils_index_.schemaentry.md)][]*
