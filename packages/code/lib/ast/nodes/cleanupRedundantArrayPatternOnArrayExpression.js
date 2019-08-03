/**
 * @memberof module:@the-/code.ast.nodes
 * @function cleanupRedundantArrayPatternOnArrayExpression
 */
'use strict'

const {
  constants: { NodeTypes },
  finder,
} = require('@the-/ast')

/** @lends module:@the-/code.ast.nodes.cleanupRedundantArrayPatternOnArrayExpression */
function cleanupRedundantArrayPatternOnArrayExpression(
  ArrayExpression,
  { get, replace },
) {
  const SpreadElement = finder
    .findByTypes(ArrayExpression, [NodeTypes.SpreadElement])
    .find((S) => S.argument.type === NodeTypes.ArrayExpression)
  if (!SpreadElement) {
    return
  }
  const {
    argument: { elements },
    leadingComments,
  } = SpreadElement
  const range = [
    leadingComments ? leadingComments[0].start : SpreadElement.start,
    SpreadElement.end,
  ]
  if (elements.length === 0) {
    return replace(range, '')
  }
  const content = get([elements[0].start, elements[elements.length - 1].end])
  return replace(range, content)
}
module.exports = cleanupRedundantArrayPatternOnArrayExpression
