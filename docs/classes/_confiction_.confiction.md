[confiction](../README.md) › [Globals](../globals.md) › ["Confiction"](../modules/_confiction_.md) › [Confiction](_confiction_.confiction.md)

# Class: Confiction <**ConfigSchema**>

Confiction, browser based configuration manager.

**`export`** 

**`class`** Confiction

## Type parameters

▪ **ConfigSchema**: *[BaseConfigSchema](../modules/_utils_index_.md#baseconfigschema)*

## Hierarchy

* **Confiction**

## Index

### Constructors

* [constructor](_confiction_.confiction.md#constructor)

### Properties

* [config](_confiction_.confiction.md#private-config)
* [cookieParser](_confiction_.confiction.md#private-cookieparser)
* [options](_confiction_.confiction.md#private-options)
* [schema](_confiction_.confiction.md#private-schema)

### Methods

* [default](_confiction_.confiction.md#default)
* [get](_confiction_.confiction.md#get)
* [getFromCookies](_confiction_.confiction.md#private-getfromcookies)
* [getProperties](_confiction_.confiction.md#getproperties)
* [getSchema](_confiction_.confiction.md#getschema)
* [getSchemaString](_confiction_.confiction.md#getschemastring)
* [has](_confiction_.confiction.md#has)
* [load](_confiction_.confiction.md#load)
* [reset](_confiction_.confiction.md#reset)
* [set](_confiction_.confiction.md#set)
* [setToCookie](_confiction_.confiction.md#settocookie)
* [toString](_confiction_.confiction.md#tostring)
* [validate](_confiction_.confiction.md#validate)

## Constructors

###  constructor

\+ **new Confiction**(`schema`: [Schema](../modules/_utils_index_.md#schema)‹ConfigSchema›, `options`: Partial‹[ConfictionOptions](../interfaces/_utils_index_.confictionoptions.md)›): *[Confiction](_confiction_.confiction.md)*

*Defined in [Confiction.ts:53](https://github.com/leomeloxp/confiction/blob/2fe5908/src/Confiction.ts#L53)*

Creates an instance of Confiction.

**`memberof`** Confiction

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`schema` | [Schema](../modules/_utils_index_.md#schema)‹ConfigSchema› | - | A Schema object used to describe the configuration options. |
`options` | Partial‹[ConfictionOptions](../interfaces/_utils_index_.confictionoptions.md)› | {} | - |

**Returns:** *[Confiction](_confiction_.confiction.md)*

## Properties

### `Private` config

• **config**: *Map‹keyof ConfigSchema, ConfigSchema[keyof ConfigSchema]›* = new Map()

*Defined in [Confiction.ts:29](https://github.com/leomeloxp/confiction/blob/2fe5908/src/Confiction.ts#L29)*

Map holding the parsed config values.

**`type`** {Map<keyof ConfigSchema, ConfigSchema[keyof ConfigSchema]>}

**`memberof`** Confiction

___

### `Private` cookieParser

• **cookieParser**: *Cookie* = new Cookie()

*Defined in [Confiction.ts:53](https://github.com/leomeloxp/confiction/blob/2fe5908/src/Confiction.ts#L53)*

Helper tool used to get/set values from browser cookies.

**`type`** {Cookie}

**`memberof`** Confiction

___

### `Private` options

• **options**: *[ConfictionOptions](../interfaces/_utils_index_.confictionoptions.md)*

*Defined in [Confiction.ts:37](https://github.com/leomeloxp/confiction/blob/2fe5908/src/Confiction.ts#L37)*

Options used to control behaviour of the config store.

**`type`** {ConfictionOptions}

**`memberof`** Confiction

___

### `Private` schema

• **schema**: *[Schema](../modules/_utils_index_.md#schema)‹ConfigSchema›*

*Defined in [Confiction.ts:45](https://github.com/leomeloxp/confiction/blob/2fe5908/src/Confiction.ts#L45)*

Schema definition for the configuration map.

**`type`** {Schema<ConfigSchema>}

**`memberof`** Confiction

## Methods

###  default

▸ **default**(): *void*

*Defined in [Confiction.ts:70](https://github.com/leomeloxp/confiction/blob/2fe5908/src/Confiction.ts#L70)*

Reset the config values to those provided as the `default` key in the schema object.

**`memberof`** Confiction

**Returns:** *void*

___

###  get

▸ **get**(`key`: keyof ConfigSchema): *ConfigSchema[keyof ConfigSchema]*

*Defined in [Confiction.ts:85](https://github.com/leomeloxp/confiction/blob/2fe5908/src/Confiction.ts#L85)*

**`memberof`** Confiction

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | keyof ConfigSchema | The key of the desired config value. |

**Returns:** *ConfigSchema[keyof ConfigSchema]*

The value stored in config for the supplied key.

___

### `Private` getFromCookies

▸ **getFromCookies**(`key`: keyof ConfigSchema): *ConfigSchema[keyof ConfigSchema] | undefined*

*Defined in [Confiction.ts:220](https://github.com/leomeloxp/confiction/blob/2fe5908/src/Confiction.ts#L220)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | keyof ConfigSchema |

**Returns:** *ConfigSchema[keyof ConfigSchema] | undefined*

___

###  getProperties

▸ **getProperties**(): *ConfigSchema*

*Defined in [Confiction.ts:104](https://github.com/leomeloxp/confiction/blob/2fe5908/src/Confiction.ts#L104)*

Returns all config entries as a {key: value} formatted object.

**`memberof`** Confiction

**Returns:** *ConfigSchema*

___

###  getSchema

▸ **getSchema**(): *[Schema](../modules/_utils_index_.md#schema)‹ConfigSchema›*

*Defined in [Confiction.ts:127](https://github.com/leomeloxp/confiction/blob/2fe5908/src/Confiction.ts#L127)*

Returns the schema as a standard object.

**`memberof`** Confiction

**Returns:** *[Schema](../modules/_utils_index_.md#schema)‹ConfigSchema›*

___

###  getSchemaString

▸ **getSchemaString**(): *string*

*Defined in [Confiction.ts:118](https://github.com/leomeloxp/confiction/blob/2fe5908/src/Confiction.ts#L118)*

Returns the schema as a JSON string.

**`memberof`** Confiction

**Returns:** *string*

___

###  has

▸ **has**(`key`: keyof ConfigSchema | string): *boolean*

*Defined in [Confiction.ts:137](https://github.com/leomeloxp/confiction/blob/2fe5908/src/Confiction.ts#L137)*

Checks whether a config value is set in the config map.

**`memberof`** Confiction

**Parameters:**

Name | Type |
------ | ------ |
`key` | keyof ConfigSchema &#124; string |

**Returns:** *boolean*

___

###  load

▸ **load**(`config`: Partial‹ConfigSchema›): *void*

*Defined in [Confiction.ts:146](https://github.com/leomeloxp/confiction/blob/2fe5908/src/Confiction.ts#L146)*

Loads an object into the config map, overriding any provided property.

**`memberof`** Confiction

**Parameters:**

Name | Type |
------ | ------ |
`config` | Partial‹ConfigSchema› |

**Returns:** *void*

___

###  reset

▸ **reset**(`key`: keyof ConfigSchema): *void*

*Defined in [Confiction.ts:158](https://github.com/leomeloxp/confiction/blob/2fe5908/src/Confiction.ts#L158)*

Resets a given config property to its default value.

**`memberof`** Confiction

**Parameters:**

Name | Type |
------ | ------ |
`key` | keyof ConfigSchema |

**Returns:** *void*

___

###  set

▸ **set**(`key`: keyof ConfigSchema, `value`: ConfigSchema[keyof ConfigSchema]): *void*

*Defined in [Confiction.ts:168](https://github.com/leomeloxp/confiction/blob/2fe5908/src/Confiction.ts#L168)*

Sets a value to a config key.

**`memberof`** Confiction

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | keyof ConfigSchema | Key to store the config under. |
`value` | ConfigSchema[keyof ConfigSchema] | Value for the config property. |

**Returns:** *void*

___

###  setToCookie

▸ **setToCookie**(`key`: keyof ConfigSchema, `value`: ConfigSchema[keyof ConfigSchema], `options?`: CookieSetOptions): *void*

*Defined in [Confiction.ts:178](https://github.com/leomeloxp/confiction/blob/2fe5908/src/Confiction.ts#L178)*

Sets a config value to the user's cookies.

**`memberof`** Confiction

**Parameters:**

Name | Type |
------ | ------ |
`key` | keyof ConfigSchema |
`value` | ConfigSchema[keyof ConfigSchema] |
`options?` | CookieSetOptions |

**Returns:** *void*

___

###  toString

▸ **toString**(): *string*

*Defined in [Confiction.ts:187](https://github.com/leomeloxp/confiction/blob/2fe5908/src/Confiction.ts#L187)*

Returns a string representation of this object.

**`memberof`** Confiction

**Returns:** *string*

___

###  validate

▸ **validate**(`__namedParameters`: object): *boolean | never*

*Defined in [Confiction.ts:203](https://github.com/leomeloxp/confiction/blob/2fe5908/src/Confiction.ts#L203)*

Validates the current config values against the schema definition.

**`memberof`** Confiction

**Parameters:**

▪`Default value`  **__namedParameters**: *object*= { allow: 'warn' }

Name | Type |
------ | ------ |
`allow` | "warn" &#124; "strict" |

**Returns:** *boolean | never*
