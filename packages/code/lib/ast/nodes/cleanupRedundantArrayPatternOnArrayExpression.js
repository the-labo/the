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
  const SpreadArrays = finder
    .findByTypes(ArrayExpression, [NodeTypes.SpreadElement])
    .filter((S) => S.argument.type === NodeTypes.ArrayExpression)
  for (const SpreadElement of SpreadArrays) {
    const {
      argument: { elements },
      leadingComments,
    } = SpreadElement
    if (elements.length === 0) {
      return replace(
        [
          leadingComments ? leadingComments[0].start : SpreadElement.start,
          SpreadElement.end,
        ],
        '',
      )
    }
    if (!leadingComments) {
      const content = get([
        elements[0].start,
        elements[elements.length - 1].end,
      ])
      return replace(SpreadElement.range, content)
    }
  }
}
module.exports = cleanupRedundantArrayPatternOnArrayExpression
