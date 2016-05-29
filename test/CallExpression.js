import Bluebird from 'bluebird';
import q from 'q';

const Q = q.resolve().constructor;

export default [
  {
    description: 'should be injected if called built-in `Promise.resolve` in iife',
    code: `
      (() => Promise.resolve())()
    `,
    expected: Bluebird,
  },
  {
    description: 'should be injected if called built-in `Promise.resolve`',
    code: 'Promise.resolve()',
    expected: Bluebird,
  },
  {
    description: 'should be injected if called built-in `Promise.reject`',
    code: 'Promise.reject().catch(() => null)',
    expected: Bluebird,
  },
  {
    description: 'should be injected if called built-in `Promise.race`',
    code: 'Promise.race([])',
    expected: Bluebird,
  },
  {
    description: 'should be injected if called built-in `Promise.all`',
    code: 'Promise.all([])',
    expected: Bluebird,
  },
  {
    description: 'should be injected if assigned built-in `Promise.resolve` in iife',
    code: `
      (() => {
        var foo = Promise.resolve()
        return foo
      })()
    `,
    expected: Bluebird,
  },
  {
    description: 'should be injected if assigned built-in `Promise.resolve`',
    code: `
      var foo = Promise.resolve()
      foo
    `,
    expected: Bluebird,
  },
  {
    description: 'should be injected if assigned built-in `Promise.race`',
    code: `
      var foo = Promise.race([])
      foo
    `,
    expected: Bluebird,
  },
  {
    description: 'should be injected if assigned built-in `Promise.all`',
    code: `
      var foo = Promise.all([])
      foo
    `,
    expected: Bluebird,
  },
  {
    description: 'should not be injected if `Promise` already imported',
    code: `
      import Promise from 'q'
      Promise.resolve()
    `,
    expected: Q,
  },
  {
    description: 'should not be injected if `Promise` already imported using named declaration',
    code: `
      import {all, default as Promise} from 'q'
      Promise.resolve()
    `,
    expected: Q,
  },
  {
    description: 'should not be injected if `Promise` already defined',
    code: `
      var Promise = require('q')
      Promise.resolve()
    `,
    expected: Q,
  },
];
