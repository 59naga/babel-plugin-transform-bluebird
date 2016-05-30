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
          file.UNUSE_BLUEBIRD = false;
          for (const node of path.node.body) {
            // found "import Promise"
            const specifiers = node.specifiers || [];
            const localNames = specifiers.map((specifier) => specifier.local.name);
            if (localNames.indexOf(defineName) > -1) {
              file.UNUSE_BLUEBIRD = true;
              return;
            }

            // found "var Promise"
            const declarations = node.declarations || [];
            const declarationIds = declarations.map((declaration) => declaration.id.name);
            if (declarationIds.indexOf(defineName) > -1) {
              file.UNUSE_BLUEBIRD = true;
              return;
            }
          }
        },
      },

      // found "new Promise"
      NewExpression(path, file) {
        if (file.UNUSE_BLUEBIRD) {
          return;
        }

        if (path.get('callee').node.name === defineName) {
          path.node.callee = file.addImport('bluebird', 'default', 'Promise');
        }
      },

      // found "fn(Promise)"
      Identifier(path, file) {
        if (file.UNUSE_BLUEBIRD) {
          return;
        }

        if (path.node.name === defineName) {
          if (path.parentPath.isCallExpression()) {
            path.replaceWith(file.addImport('bluebird', 'default', 'Promise'));
          }
        }
      },

      // found "Promise.methods"
      MemberExpression(path, file) {
        if (file.UNUSE_BLUEBIRD) {
          return;
        }

        methods.forEach((method) => {
          if (path.matchesPattern(`${defineName}.${method}`)) {
            const bluebird = file.addImport('bluebird', 'default', 'Promise');
            const {
              memberExpression,
              identifier,
            } = babel.types;
            path.replaceWith(memberExpression(bluebird, identifier(method)));
          }
        });
      },
    },
  });
};
