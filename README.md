# Confiction

![build](https://github.com/leomeloxp/confiction/workflows/build/badge.svg?branch=master)
[![npm version](http://img.shields.io/npm/v/confiction.svg)](https://www.npmjs.org/package/confiction)

Manage your browser based environment configuration with conviction.

Confiction is inspired by [Convict](https://github.com/mozilla/node-convict/) and [Conf](https://github.com/sindresorhus/conf).

## Usage

Firstly:

```sh
npm install confiction
```

Then define your schema somewhere within your project, eg:

```ts
// config.ts
import { Confiction, Schema } from '../dist';

const schema = {
  url: {
    doc: 'The api endpoint url.',
    format: 'string',
    default: 'http://localhost:3000',
  },
  token: {
    doc: 'An auth token to be sent alongside API requests.',
    format: 'string',
    default: '<TOKEN>',
  },
};
type Config = {
  [k in keyof typeof schema]: typeof schema[k]['default'];
};

type CID = Config['url'];

export const config = new Confiction(schema as Schema<Config>);
```

You can optionally override default config (eg, on page load) like so:

```ts
// index.ts
import { config } from './config';

fetch('/config.json').then(async (res) => {
  // Some config values that override default ones.
  const newConfig = await res.json();
  config.load(newConfig);
});
```

And to use your config store you can simply get the values from the exported `config` object:

```ts
// someFile.ts
import { config, Config } from './config';
// Type matching the config entry.
const api = config.get<Config, 'passwordRetries'>('passwordRetries');
// Casting the type of a config value.
const token = config.get<string>('token');

fetch(`${api}/me`, {
  headers: {
    authorization: `Bearer ${token}`,
  },
});
```

## Roadmap

Confiction is in its early days still but I intend to improve it in the near future a number of new features so if you feel like something should be added into the library feel free to open an issue about it. A few things that I already plan on adding include:

### The ability to load or set overriding config values to cookies and local storage.

This should allow for potentially interesting use cases such as feature flags, easter eggs or real time client side debugging.

### Nested configs and `.` notation support

This should allow for a better grouping of configs and more complex schemas that would suite a larger number of use cases.

### Better validation for schemas

Right now schema validation is done in a very naive way. In the future I intend to support more complex validation formats such as those present in _Convict_.
