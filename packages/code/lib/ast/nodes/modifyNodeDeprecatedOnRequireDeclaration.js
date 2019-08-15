'use strict'

/**
 * @memberof module:@the-/code.ast.nodes
 * @function modifyNodeDeprecatedOnRequireDeclaration
 */
function modifyNodeDeprecatedOnRequireDeclaration(Declaration, options = {}) {
  const { get, replace } = options

  const CallDeclarations = Declaration.declarations.filter(
    (declaration) => declaration.init.type === 'CallExpression',
  )
  const assertDeclarations = CallDeclarations.filter((declaration) => {
    const [arg] = declaration.init.arguments || []
    return arg && arg.type === 'StringLiteral' && arg.value === 'assert'
  })

  for (const assertDeclaration of assertDeclarations) {
    const { id } = assertDeclaration
    if (id.type === 'ObjectPattern') {
      const needsStrict = id.properties.every(
        (Node) => !/strict/i.test(Node.key.name),
      )
      if (needsStrict) {
        return replace(
          [Declaration.start, Declaration.end],
          `${get([Declaration.start, Declaration.end])}.strict`,
        )
      }
    }
  }
}

module.exports = modifyNodeDeprecatedOnRequireDeclaration
