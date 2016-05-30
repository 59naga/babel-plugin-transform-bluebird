babel-plugin-transform-bluebird
---

<p align="right">
  <a href="https://npmjs.org/package/babel-plugin-transform-bluebird">
    <img src="https://img.shields.io/npm/v/babel-plugin-transform-bluebird.svg?style=flat-square">
  </a>
  <a href="https://travis-ci.org/59naga/babel-plugin-transform-bluebird">
    <img src="http://img.shields.io/travis/59naga/babel-plugin-transform-bluebird.svg?style=flat-square">
  </a>
  <a href="https://codeclimate.com/github/59naga/babel-plugin-transform-bluebird/coverage">
    <img src="https://img.shields.io/codeclimate/github/59naga/babel-plugin-transform-bluebird.svg?style=flat-square">
  </a>
  <a href="https://codeclimate.com/github/59naga/babel-plugin-transform-bluebird">
    <img src="https://img.shields.io/codeclimate/coverage/github/59naga/babel-plugin-transform-bluebird.svg?style=flat-square">
  </a>
  <a href="https://gemnasium.com/59naga/babel-plugin-transform-bluebird">
    <img src="https://img.shields.io/gemnasium/59naga/babel-plugin-transform-bluebird.svg?style=flat-square">
  </a>
</p>

replace [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) with  [bluebird](https://github.com/petkaantonov/bluebird#readme) plugin.

Installation
---
```bash
npm install bluebird babel-plugin-transform-bluebird --save
```

Example
---

**In**

```js
Promise.resolve().then(() => new Promise((resolve) => resolve()))
```

**Out**

```js
import _Promise from "bluebird";
_Promise.resolve().then(() => new _Promise(resolve => resolve()));
```

## Support expression

- `NewExpression` (e.g. `new Promise` -> `new Bluebird`)
- `MemberExpression` only [built-in Promise  methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#Methods) (e.g. `Promise.resolve` -> `Bluebird.resolve`)
- `Identifier` only `Promise` (e.g. `fn(Promise) -> fn(Bluebird)`)

But, if the `Promise` is already import in file, the file does not transform.

```js
// does not transform
import Promise from 'q';
Promise.resolve();
```

## Unsupport expression

- `BinaryExpression` (e.g. `instanceof Promise`, `if(foo === Promise)`)
- `MemberExpression` non built-in `Promise` methods (e.g. `Promise.settle`)

the purpose of this plugin is to only transform a built-in `Promise` to the `Bluebird`.

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-bluebird"]
}
```

### Via CLI

```bash
$ babel --plugins transform-bluebird script.js
```

### Via Node API

```js
require("babel-core").transform("code", {
  plugins: ["transform-bluebird"]
});
```

Development
---
Requirement global
* NodeJS v5.11.0
* Npm v3.8.6

```bash
git clone https://github.com/59naga/babel-plugin-transform-bluebird
cd babel-plugin-transform-bluebird
npm install

npm test
```

License
---
[MIT](http://59naga.mit-license.org/)
