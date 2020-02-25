[confiction](../README.md) › [Globals](../globals.md) › ["utils/index"](_utils_index_.md)

# External module: "utils/index"

## Index

### Interfaces

* [ConfictionOptions](../interfaces/_utils_index_.confictionoptions.md)
* [ConfigValidateOptions](../interfaces/_utils_index_.configvalidateoptions.md)
* [SchemaEntry](../interfaces/_utils_index_.schemaentry.md)

### Type aliases

* [BaseConfigSchema](_utils_index_.md#baseconfigschema)
* [SafeConfigSchema](_utils_index_.md#safeconfigschema)
* [Schema](_utils_index_.md#schema)

### Variables

* [schemaEntryKeys](_utils_index_.md#const-schemaentrykeys)

### Functions

* [isSchemaEntry](_utils_index_.md#const-isschemaentry)
* [parseEntries](_utils_index_.md#const-parseentries)

## Type aliases

###  BaseConfigSchema

Ƭ **BaseConfigSchema**: *object*

*Defined in [utils/index.ts:37](https://github.com/leomeloxp/confiction/blob/2fe5908/src/utils/index.ts#L37)*

#### Type declaration:

* \[ **k**: *string*\]: unknown

___

###  SafeConfigSchema

Ƭ **SafeConfigSchema**: *object*

*Defined in [utils/index.ts:41](https://github.com/leomeloxp/confiction/blob/2fe5908/src/utils/index.ts#L41)*

#### Type declaration:

___

###  Schema

Ƭ **Schema**: *object*

*Defined in [utils/index.ts:45](https://github.com/leomeloxp/confiction/blob/2fe5908/src/utils/index.ts#L45)*

#### Type declaration:

## Variables

### `Const` schemaEntryKeys

• **schemaEntryKeys**: *string[]* = ['doc', 'default']

*Defined in [utils/index.ts:1](https://github.com/leomeloxp/confiction/blob/2fe5908/src/utils/index.ts#L1)*

## Functions

### `Const` isSchemaEntry

▸ **isSchemaEntry**<**T**>(`obj`: [SchemaEntry](../interfaces/_utils_index_.schemaentry.md)‹T› | object): *obj is SchemaEntry<T>*

*Defined in [utils/index.ts:3](https://github.com/leomeloxp/confiction/blob/2fe5908/src/utils/index.ts#L3)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`obj` | [SchemaEntry](../interfaces/_utils_index_.schemaentry.md)‹T› &#124; object | {} |

**Returns:** *obj is SchemaEntry<T>*

___

### `Const` parseEntries

▸ **parseEntries**<**T**>(`schema`: [Schema](_utils_index_.md#schema)‹T›): *[keyof T, T[keyof T]][]*

*Defined in [utils/index.ts:15](https://github.com/leomeloxp/confiction/blob/2fe5908/src/utils/index.ts#L15)*

**Type parameters:**

▪ **T**: *[BaseConfigSchema](_utils_index_.md#baseconfigschema)*

**Parameters:**

Name | Type |
------ | ------ |
`schema` | [Schema](_utils_index_.md#schema)‹T› |

**Returns:** *[keyof T, T[keyof T]][]*
