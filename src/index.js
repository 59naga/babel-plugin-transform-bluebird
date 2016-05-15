// target
const defineName = 'Promise';
const methods = [
  'resolve',
  'reject',
  'all',
  'race',
];

export default (babel) => {
  return ({
    visitor: {
      Program: {
        enter(path, file) {
          file.__UNUSE_BLUEBIRD__ = false;
          for (const node of path.node.body) {
            // found "import Promise"
            const specifiers = node.specifiers || [];
            const localNames = specifiers.map((specifier) => specifier.local.name);
            if (localNames.indexOf(defineName) > -1) {
              file.__UNUSE_BLUEBIRD__ = true;
              return;
            }

            // found "var Promise"
            const declarations = node.declarations || [];
            const declarationIds = declarations.map((declaration) => declaration.id.name);
            if (declarationIds.indexOf(defineName) > -1) {
              file.__UNUSE_BLUEBIRD__ = true;
              return;
            }
          }
        },
      },

      // found "new Promise"
      NewExpression(path, file) {
        if (file.__UNUSE_BLUEBIRD__) {
          return;
        }

        if (path.get('callee').node.name === defineName) {
          path.node.callee = file.addImport('bluebird', 'default');
        }
      },

      // found "Promise.methods()"
      CallExpression(path, file) {
        if (file.__UNUSE_BLUEBIRD__) {
          return;
        }

        methods.forEach((method) => {
          if (path.get('callee').matchesPattern(`${defineName}.${method}`)) {
            const bluebird = file.addImport('bluebird', 'default');
            const {
              memberExpression,
              identifier,
            } = babel.types;
            path.node.callee = memberExpression(bluebird, identifier(method));
          }
        });
      },
    },
  });
};
