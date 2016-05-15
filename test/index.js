// dependencies
import assert from 'assert';
import { transform } from 'babel-core';
import specs from './specs';
import vm from 'vm';

// target
import plugin from '../src';

// environment
const options = {
  presets: [
    'es2015',
  ],
  plugins: [
    plugin,
    plugin,
    plugin,
  ],
};
const vmGlobal = {
  require: (name) => require(name),
};

// specs
describe('babel-plugin-transform-bluebird', () => {
  it('noop', () => {
    const result = transform('', options);
    assert(result.code === '"use strict";');
  });

  specs.forEach((test) => {
    it(test.description, () => {
      const result = transform(test.code, options);
      const returnValue = vm.runInNewContext(result.code, vmGlobal);
      console.log(result.code);
      assert(returnValue instanceof test.expected);
    });
  });
});
