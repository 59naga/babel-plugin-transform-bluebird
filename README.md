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

Replace `Promise` with an [bluebird](https://github.com/petkaantonov/bluebird#readme) plugin.

Installation
---
```bash
npm install bluebird babel-plugin-transform-bluebird --save
```

Example
---

**In**

```js
Promise.resolve()
```

**Out**

```js
var Promise = require("bluebird");
Promise.resolve();
```

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
