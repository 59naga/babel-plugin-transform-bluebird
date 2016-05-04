import Bluebird from 'bluebird';
import q from 'q';

const Q = q.resolve().constructor;

export default [
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
    description: 'should be injected if called built-in `Promise`',
    code: `
      new Promise((resolve)=> resolve())
    `,
    expected: Bluebird,
  },
  {
    description: 'should be injected if assigned built-in `Promise`',
    code: `
      var hoge = new Promise((resolve)=> resolve())
      hoge
    `,
    expected: Bluebird,
  },
  {
    description: 'should be injected if assigned built-in `Promise.resolve`',
    code: `
      var hoge = Promise.resolve()
      hoge
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
  {
    description: 'should not be injected if `Promise` already defined using new expression',
    code: `
      var Promise = require('q')
      new Promise((resolve)=> resolve())
    `,
    expected: Q,
  },
];
