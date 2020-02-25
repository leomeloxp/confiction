[confiction](../README.md) › [Globals](../globals.md) › ["Confiction.test"](_confiction_test_.md)

# External module: "Confiction.test"

## Index

### Type aliases

* [Config](_confiction_test_.md#config)

### Object literals

* [configOptionsToLoad](_confiction_test_.md#const-configoptionstoload)
* [invalidSchema](_confiction_test_.md#const-invalidschema)
* [schema](_confiction_test_.md#const-schema)

## Type aliases

###  Config

Ƭ **Config**: *object*

*Defined in [Confiction.test.ts:41](https://github.com/leomeloxp/confiction/blob/2fe5908/src/Confiction.test.ts#L41)*

#### Type declaration:

## Object literals

### `Const` configOptionsToLoad

### ▪ **configOptionsToLoad**: *object*

*Defined in [Confiction.test.ts:36](https://github.com/leomeloxp/confiction/blob/2fe5908/src/Confiction.test.ts#L36)*

###  numberConfig

• **numberConfig**: *number* = 23

*Defined in [Confiction.test.ts:38](https://github.com/leomeloxp/confiction/blob/2fe5908/src/Confiction.test.ts#L38)*

###  stringConfig

• **stringConfig**: *string* = "Another string"

*Defined in [Confiction.test.ts:37](https://github.com/leomeloxp/confiction/blob/2fe5908/src/Confiction.test.ts#L37)*

___

### `Const` invalidSchema

### ▪ **invalidSchema**: *object*

*Defined in [Confiction.test.ts:23](https://github.com/leomeloxp/confiction/blob/2fe5908/src/Confiction.test.ts#L23)*

▪ **numberConfig**: *object*

*Defined in [Confiction.test.ts:29](https://github.com/leomeloxp/confiction/blob/2fe5908/src/Confiction.test.ts#L29)*

* **default**: *string* = "A string"

* **doc**: *string* = "A number config value"

* **format**: *string* = "number"

▪ **stringConfig**: *object*

*Defined in [Confiction.test.ts:24](https://github.com/leomeloxp/confiction/blob/2fe5908/src/Confiction.test.ts#L24)*

* **default**: *number* = 42

* **doc**: *string* = "A string config value"

* **format**: *string* = "string"

___

### `Const` schema

### ▪ **schema**: *object*

*Defined in [Confiction.test.ts:4](https://github.com/leomeloxp/confiction/blob/2fe5908/src/Confiction.test.ts#L4)*

▪ **numberConfig**: *object*

*Defined in [Confiction.test.ts:10](https://github.com/leomeloxp/confiction/blob/2fe5908/src/Confiction.test.ts#L10)*

* **default**: *number* = 42

* **doc**: *string* = "A number config value"

* **format**: *string* = "number"

▪ **sensitiveConfig**: *object*

*Defined in [Confiction.test.ts:15](https://github.com/leomeloxp/confiction/blob/2fe5908/src/Confiction.test.ts#L15)*

* **default**: *string* = "secret"

* **doc**: *string* = "A secret value"

* **format**: *string* = "string"

* **sensitive**: *boolean* = true

▪ **stringConfig**: *object*

*Defined in [Confiction.test.ts:5](https://github.com/leomeloxp/confiction/blob/2fe5908/src/Confiction.test.ts#L5)*

* **default**: *string* = "A string"

* **doc**: *string* = "A string config value"

* **format**: *string* = "string"
