'use strict'

/**
 * @memberof module:@the-/code.ast.nodes
 * @function cleanupUnusedOnVariableNode
 */
const {
  isEmptyObjectPattern,
  isRequireExpression,
} = require('../../helpers/astHelper')

/** @lends module:@the-/code.ast.nodes.cleanupUnusedOnVariableNode */
function cleanupUnusedOnVariableNode(
  VariableDeclaration,
  { ConsumingIdentifiers, replace },
) {
  const { declarations } = VariableDeclaration
  if (!declarations) {
    return
  }
  for (let i = 0; i < declarations.length; i++) {
    const prevDeclaration = declarations[i - 1]
    const declaration = declarations[i]
    const nextDeclaration = declarations[i + 1]
    const declarationRemove = () => {
      if (declarations.length === 1) {
        const start =
          VariableDeclaration.loc.start.column === 0
            ? VariableDeclaration.start - 1
            : VariableDeclaration.start
        const { end } = VariableDeclaration
        return replace([start, end], '')
      }
      const start = prevDeclaration
        ? prevDeclaration.end
        : declaration.start - 1
      const end = nextDeclaration ? nextDeclaration.start - 1 : declaration.end
      return replace([start, end], '')
    }
    const { id, init } = declaration
    if (isEmptyObjectPattern(id)) {
      const shouldRemove = ['MemberExpression', 'Identifier'].includes(
        init.type,
      )
      if (shouldRemove) {
        return declarationRemove()
      }
      const isRequire = isRequireExpression(init)
      if (isRequire) {
        return declarationRemove()
      }
    }
    const skip = id.type !== 'Identifier'
    if (skip) {
      continue
    }
    const usages = ConsumingIdentifiers.filter(
      (Identifier) => Identifier !== id,
    )
      .filter((Identifier) => Identifier !== id)
      .filter((Identifier) => Identifier.name === id.name)
    const unused = usages.length === 0
    if (!unused) {
      continue
    }
    const shouldRemove = !init || /Literal$/.test(init.type)
    if (shouldRemove) {
      return declarationRemove()
    }
    const isRequire = isRequireExpression(init)
    if (isRequire) {
      return declarationRemove()
    }
  }
}

module.exports = cleanupUnusedOnVariableNode
