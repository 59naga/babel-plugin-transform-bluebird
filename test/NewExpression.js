import Bluebird from 'bluebird';
import q from 'q';

const Q = q.resolve().constructor;

export default [
  {
    description: 'should be injected if called built-in `Promise`',
    code: `
      new Promise((resolve)=> resolve())
    `,
    expected: Bluebird,
  },
  {
    description: 'should be injected if assigned built-in `Promise`',
    code: `
      var foo = new Promise((resolve)=> resolve())
      foo
    `,
    expected: Bluebird,
  },
  {
    description: 'should not be injected if `Promise` already defined using new expression',
    code: `
      var Promise = require('q')
      new Promise((resolve)=> resolve())
    `,
    expected: Q,
  },
];
