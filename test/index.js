// dependencies
import assert from 'assert';
import { transform } from 'babel-core';
import NewExpression from './NewExpression';
import MemberExpression from './MemberExpression';
import Identifier from './Identifier';
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
  Promise, // fix "returnValue === Promise" always false
};

// specs
describe('babel-plugin-transform-bluebird', () => {
  it('noop', () => {
    const result = transform('', options);
    assert(result.code === '"use strict";');
  });

  describe('NewExpression', () => {
    NewExpression.forEach((test) => {
      it(test.description, () => {
        const result = transform(test.code, options);
        const returnValue = vm.runInNewContext(result.code, vmGlobal);
        assert(returnValue instanceof test.expected);
      });
    });
  });

  describe('MemberExpression', () => {
    MemberExpression.forEach((test) => {
      it(test.description, () => {
        const result = transform(test.code, options);
        const returnValue = vm.runInNewContext(result.code, vmGlobal);
        assert(returnValue instanceof test.expected);
      });
    });
  });

  describe('Identifier', () => {
    Identifier.forEach((test) => {
      it(test.description, () => {
        const result = transform(test.code, options);
        const returnValue = vm.runInNewContext(result.code, vmGlobal);
        assert(returnValue === test.expected);
      });
    });
  });
});
