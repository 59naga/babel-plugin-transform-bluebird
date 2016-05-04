// private
const defineName = 'Promise';

/**
* @module babel-plugin-transform-bluebird
* @returns {babelPlugin} unknown
*/
export default ({ template }) => {
  return ({
    visitor: {
      Program: {
        exit(path) {
          let injectBluebird = false;
          for (const node of path.node.body) {
            const expression = node.expression || {};
            const specifiers = node.specifiers || [];
            const declarations = node.declarations || [];

            // found "new Promise" or "Promise.method()"
            const calleeName = expression.callee && (expression.callee.name || expression.callee.object.name);
            if (calleeName === defineName) {
              injectBluebird = true;
            }

            // found "var foo = new Promise" or "var foo = Promise.resolve()"
            const declarationInits = declarations.map((declaration) => declaration.init.callee.name || declaration.init.callee.object.name);
            if (declarationInits.indexOf(defineName) > -1) {
              injectBluebird = true;
            }

            // found "import Promise"
            const localNames = specifiers.map((specifier) => specifier.local.name);
            if (localNames.indexOf(defineName) > -1) {
              return;
            }

            // found "var Promise"
            const declarationIds = declarations.map((declaration) => declaration.id.name);
            if (declarationIds.indexOf(defineName) > -1) {
              return;
            }
          }

          if (injectBluebird) {
            const topNodes = [template(`var ${defineName} = require("bluebird")`)()];
            path.unshiftContainer('body', topNodes);
          }
        },
      },
    },
  });
};
