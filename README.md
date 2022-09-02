<h1><a href="https://www.npmjs.com/package/env-safe">env-safe</a></h1>

<img src="https://avatars.githubusercontent.com/u/21240036?s=200&v=4" alt="env-safe" align="right" width="110" />

<!-- Badges -->
[![CI](https://github.com/creatrip/env-safe/actions/workflows/ci.yml/badge.svg)](https://github.com/creatrip/env-safe/actions/workflows/ci.yml)
[![NPM version](https://img.shields.io/npm/v/env-safe.svg)](https://www.npmjs.com/package/env-safe)
<img alt="NPM Download" src="https://img.shields.io/npm/dw/env-safe">
<img alt="GitHub contributors" src="https://img.shields.io/github/contributors/creatrip/env-safe">

**env-safe** is module that loads that loads environment variables from a `.env` file into [`process.env`](https://nodejs.org/docs/latest/api/process.html#process_process_env) with type-safe. And can also validate the type of [`process.env`](https://nodejs.org/docs/latest/api/process.html#process_process_env). **env-safe** is dependent on [ini](https://www.npmjs.com/package/ini) and [reflect-metadata](https://www.npmjs.com/package/reflect-metadata).

<!-- Introduce -->

## Install

```sh
npm intall env-safe --save
```

Or installing with yarn? `yarn add env-safe`

## Usage

Turn on `emitDecoratorMetadata`, `experimentalDecorators` in tsconfig.json:

```json
{
  "compilerOptions": {
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true
    ...
  }
  ...
}
```

Create a `.env` file in the root of your project:

```dosini
DATABASE_HOST="localhost"
DATABASE_PORT=3306
```

Use env-safe to create config class:

```typescript
import { Key, Env } from 'env-safe';

@Env()
export class Config {
  @Key()
  static DATABASE_HOST: string;

  @Key()
  static DATABASE_PORT: number;
}
```

That's it. Just use the newly created config class:

```typescript
import { Config } from './config.ts';

mysql.connect({
  host: Config.DATABASE_HOST, // String("localhost")
  port: Config.DATABASE_PORT  // Number(3306)
});

// Even can use process.env
mysql.connect({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT)
});
```

## Documentation

### Comment

Comments may be added to your file on their own line or inline:

```dosini
# This is a comment
DATABASE_HOST="localhost" # comment
DATABASE_PASSWORD="can-define-with-#"
```

Comments begin where a `#` exists, so if your value contains a `#` please wrap it in quotes.

### Default value

Set default value to config class property:

```typescript
@Env()
export class Config {
  @Key({ default: 'localhost' })
  static DATABASE_HOST: string;

  @Key({ default: 3306 })
  static DATABASE_PORT: number;
}
```

### Multiple config class

Can define multiple config class:

```dosini
AWS_SECRET_KEY="secret key"
S3_BUCKET="bucket name"
```

```typescript
@Env()
export class AWSConfig {
  @Key()
  static AWS_SECRET_KEY: string; // String("secret key")
}

@Env()
export class S3Config {
  @Key()
  static S3_BUCKET: string; // String("bucket name")
}
```

### Without `.env`

Before validation, env-safe do merge `.env` and `process.env`. because of this it works fine `process.env` is set even without `.env`:

```sh
DATABASE_HOST=localhost node dist/index.js
```

```typescript
@Env()
export class Config {
  @Key()
  static DATABASE_HOST: string; // String("localhost")
}
```

### Type-Safe

If turn on strictMode. Since the provided `.env` or `process.env` does not contain all the variables defined in config class, an exception is thrown:

```dosini
DATABASE_HOST=
DATABASE_PORT="wrong data"
```

```typescript
@Env({ strictMode: true })
export class Config {
  @Key()
  static DATABASE_HOST: string; // Not defined Error

  @Key()
  static DATABASE_POST: number; // NaN Error

  @Key()
  static DATABASE_USER: string; // Not defined Error
}
```

```sh
$ node dist/index.js

Error: DATABASE_HOST is not defined in .env
```

### Find un using key in `.env`

If turn on noUnusedKey. Can find un using key in `.env`:

```dosini
DATABASE_HOST="localhost"
DATABASE_PORT=3306
```

```typescript
@Env({ noUnusedKey: true })
export class Config {
  @Key()
  static DATABASE_HOST: string;
}
```

```sh
$ node dist/index.js

Error: DATABASE_PORT is not defined in config class
```

### Change `.env` path

Can change `.env` path in your project:

```sh
$ ls
development.env  stagging.env  production.env
```

```typescript
@Env({ path: 'development.env' })
export class Config {
  ...
}
```

## Contributing Guide

See [CONTRIBUTING.md](https://github.com/creatrip/env-safe/blob/main/CONTRIBUTING.md)