/**
 * @memberof module:@the-/code.ast.nodes
 * @function modifyNodeDeprecatedOnRequireDeclaration
 */
'use strict'

/** @lends module:@the-/code.ast.nodes.modifyNodeDeprecatedOnRequireDeclaration */
function modifyNodeDeprecatedOnRequireDeclaration(Declaration, options = {}) {
  const { get, replace } = options

  const CallDeclarations = Declaration.declarations.filter(
    (declaration) => declaration.init.type === 'CallExpression',
  )
  const assertDeclarations = CallDeclarations.filter((declaration) => {
    const [arg] = declaration.init['arguments'] || []
    return arg && arg.type === 'StringLiteral' && arg.value === 'assert'
  })

  for (const assertDeclaration of assertDeclarations) {
    const { id } = assertDeclaration
    if (id.type === 'ObjectPattern') {
      const needsStrict = id.properties.every(
        (Node) => !/strict/.test(Node.key.name),
      )
      if (needsStrict) {
        return replace(
          [Declaration.start, Declaration.end],
          get([Declaration.start, Declaration.end]) + '.strict',
        )
      }
    }
  }
}

module.exports = modifyNodeDeprecatedOnRequireDeclaration
