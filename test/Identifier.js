import Bluebird from 'bluebird';
import q from 'q';

export default [
  {
    description: 'should be injected if called built-in `Promise` in argument',
    code: `
      const f = (a) => a
      f(Promise)
    `,
    expected: Bluebird,
  },
  {
    description: 'should be injected if called built-in `Promise.resolve` in argument',
    code: `
      const f = (a) => a
      f(Promise.resolve)
    `,
    expected: Bluebird.resolve,
  },
  {
    description: 'should be injected if called built-in `Promise.reject` in argument',
    code: `
      const f = (a) => a
      f(Promise.reject)
    `,
    expected: Bluebird.reject,
  },
  {
    description: 'should be injected if called built-in `Promise.all` in argument',
    code: `
      const f = (a) => a
      f(Promise.all)
    `,
    expected: Bluebird.all,
  },
  {
    description: 'should be injected if called built-in `Promise.race` in argument',
    code: `
      const f = (a) => a
      f(Promise.race)
    `,
    expected: Bluebird.race,
  },
  {
    description: 'should not be injected in binaryExpression(instanceof)',
    code: `
      Promise.resolve() instanceof Promise
    `,
    expected: false,
  },
  {
    description: 'should not be injected in binaryExpression(===)',
    code: `
      Promise === Promise
    `,
    expected: true,
  },
  {
    description: 'should not be injected if `Promise` already imported',
    code: `
      import Promise from 'q'
      const f = (a) => a
      f(Promise)
    `,
    expected: q,
  },
];
