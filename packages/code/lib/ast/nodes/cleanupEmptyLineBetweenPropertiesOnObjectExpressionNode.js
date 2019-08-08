/**
 * @memberof module:@the-/code.ast.nodes
 * @function cleanupEmptyLineBetweenPropertiesOnObjectExpressionNode
 */
'use strict'

/** @lends module:@the-/code.ast.nodes.cleanupEmptyLineBetweenPropertiesOnObjectExpressionNode */
function cleanupEmptyLineBetweenPropertiesOnObjectExpressionNode(
  ObjectExpression,
  { removeLine },
) {
  const { properties } = ObjectExpression
  for (const [i, property] of properties.entries()) {
    const nextProperty = properties[i + 1]
    if (!nextProperty) {
      continue
    }

    const { loc } = property
    const nextLoc = nextProperty.leadingComments
      ? nextProperty.leadingComments[0].loc
      : nextProperty.loc
    const hasEmptyLine = nextLoc.start.line - loc.end.line > 1
    if (hasEmptyLine) {
      return removeLine(loc.end.line + 1)
    }
  }
}

module.exports = cleanupEmptyLineBetweenPropertiesOnObjectExpressionNode
