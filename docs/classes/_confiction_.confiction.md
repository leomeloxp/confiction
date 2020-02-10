[confiction](../README.md) › [Globals](../globals.md) › ["Confiction"](../modules/_confiction_.md) › [Confiction](_confiction_.confiction.md)

# Class: Confiction

Confiction, browser based configuration manager.

**`export`** 

**`class`** Confiction

## Hierarchy

* **Confiction**

## Index

### Constructors

* [constructor](_confiction_.confiction.md#constructor)

### Properties

* [config](_confiction_.confiction.md#private-config)
* [schema](_confiction_.confiction.md#private-schema)

### Methods

* [default](_confiction_.confiction.md#default)
* [get](_confiction_.confiction.md#get)
* [getProperties](_confiction_.confiction.md#getproperties)
* [getSchema](_confiction_.confiction.md#getschema)
* [getSchemaString](_confiction_.confiction.md#getschemastring)
* [has](_confiction_.confiction.md#has)
* [load](_confiction_.confiction.md#load)
* [reset](_confiction_.confiction.md#reset)
* [set](_confiction_.confiction.md#set)
* [toString](_confiction_.confiction.md#tostring)
* [validate](_confiction_.confiction.md#validate)

## Constructors

###  constructor

\+ **new Confiction**(`schema`: [Schema](../modules/_utils_index_.md#schema)‹[UnknownSchema](../modules/_confiction_.md#unknownschema)›): *[Confiction](_confiction_.confiction.md)*

*Defined in [Confiction.ts:27](https://github.com/leomeloxp/confiction/blob/14cb15e/src/Confiction.ts#L27)*

Creates an instance of Confiction.

**`memberof`** Confiction

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`schema` | [Schema](../modules/_utils_index_.md#schema)‹[UnknownSchema](../modules/_confiction_.md#unknownschema)› | A Schema object used to describe the configuration options. |

**Returns:** *[Confiction](_confiction_.confiction.md)*

## Properties

### `Private` config

• **config**: *Map‹string, [ConfigValue](../modules/_confiction_.md#configvalue)›* = new Map()

*Defined in [Confiction.ts:19](https://github.com/leomeloxp/confiction/blob/14cb15e/src/Confiction.ts#L19)*

Map holding the parsed config values.

**`type`** {Map<string, ConfigValue>}

**`memberof`** Confiction

___

### `Private` schema

• **schema**: *[Schema](../modules/_utils_index_.md#schema)‹[UnknownSchema](../modules/_confiction_.md#unknownschema)›*

*Defined in [Confiction.ts:27](https://github.com/leomeloxp/confiction/blob/14cb15e/src/Confiction.ts#L27)*

Schema definition for the configuration map.

**`type`** {Schema}

**`memberof`** Confiction

## Methods

###  default

▸ **default**(): *void*

*Defined in [Confiction.ts:43](https://github.com/leomeloxp/confiction/blob/14cb15e/src/Confiction.ts#L43)*

Reset the config values to those provided as the `default` key in the schema object.

**`memberof`** Confiction

**Returns:** *void*

___

###  get

▸ **get**<**T**, **K**>(`key`: K): *K extends keyof T ? T[K] : T*

*Defined in [Confiction.ts:57](https://github.com/leomeloxp/confiction/blob/14cb15e/src/Confiction.ts#L57)*

Returns the value for the config stored as the supplied key.

**`memberof`** Confiction

**Type parameters:**

▪ **T**

▪ **K**: *keyof T | any*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | K | The key of the desired config value. |

**Returns:** *K extends keyof T ? T[K] : T*

The value stored in config for the supplied key.

___

###  getProperties

▸ **getProperties**(): *object*

*Defined in [Confiction.ts:68](https://github.com/leomeloxp/confiction/blob/14cb15e/src/Confiction.ts#L68)*

Returns all config entries as a {key: value} formatted object.

**`memberof`** Confiction

**Returns:** *object*

* \[ **key**: *string*\]: [ConfigValue](../modules/_confiction_.md#configvalue)

___

###  getSchema

▸ **getSchema**<**T**>(): *[Schema](../modules/_utils_index_.md#schema)‹T›*

*Defined in [Confiction.ts:86](https://github.com/leomeloxp/confiction/blob/14cb15e/src/Confiction.ts#L86)*

Returns the schema as a standard object.

**`memberof`** Confiction

**Type parameters:**

▪ **T**

**Returns:** *[Schema](../modules/_utils_index_.md#schema)‹T›*

___

###  getSchemaString

▸ **getSchemaString**(): *string*

*Defined in [Confiction.ts:77](https://github.com/leomeloxp/confiction/blob/14cb15e/src/Confiction.ts#L77)*

Returns the schema as a JSON string.

**`memberof`** Confiction

**Returns:** *string*

___

###  has

▸ **has**(`key`: string): *boolean*

*Defined in [Confiction.ts:96](https://github.com/leomeloxp/confiction/blob/14cb15e/src/Confiction.ts#L96)*

Checks whether a config value is set in the config map.

**`memberof`** Confiction

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *boolean*

___

###  load

▸ **load**(`config`: object): *void*

*Defined in [Confiction.ts:105](https://github.com/leomeloxp/confiction/blob/14cb15e/src/Confiction.ts#L105)*

Loads an object into the config map, overriding any provided property.

**`memberof`** Confiction

**Parameters:**

Name | Type |
------ | ------ |
`config` | object |

**Returns:** *void*

___

###  reset

▸ **reset**(`key`: string): *void*

*Defined in [Confiction.ts:116](https://github.com/leomeloxp/confiction/blob/14cb15e/src/Confiction.ts#L116)*

Resets a given config property to its default value.

**`memberof`** Confiction

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *void*

___

###  set

▸ **set**(`key`: string, `value`: [ConfigValue](../modules/_confiction_.md#configvalue)): *void*

*Defined in [Confiction.ts:126](https://github.com/leomeloxp/confiction/blob/14cb15e/src/Confiction.ts#L126)*

Sets a value to a config key.

**`memberof`** Confiction

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | string | Key to store the config under. |
`value` | [ConfigValue](../modules/_confiction_.md#configvalue) | Value for the config property. |

**Returns:** *void*

___

###  toString

▸ **toString**(): *string*

*Defined in [Confiction.ts:135](https://github.com/leomeloxp/confiction/blob/14cb15e/src/Confiction.ts#L135)*

Returns a string representation of this object.

**`memberof`** Confiction

**Returns:** *string*

___

###  validate

▸ **validate**(`__namedParameters`: object): *boolean | never*

*Defined in [Confiction.ts:152](https://github.com/leomeloxp/confiction/blob/14cb15e/src/Confiction.ts#L152)*

Validates the current config values against the schema definition.

**`memberof`** Confiction

**Parameters:**

▪`Default value`  **__namedParameters**: *object*= { allow: 'warn' }

Name | Type |
------ | ------ |
`allow` | "warn" &#124; "strict" |

**Returns:** *boolean | never*
