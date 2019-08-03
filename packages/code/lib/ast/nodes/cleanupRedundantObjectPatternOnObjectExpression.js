/**
 * @memberof module:@the-/code.ast.nodes
 * @function cleanupRedundantObjectPatternOnObjectExpression
 */
'use strict'

const {
  constants: { NodeTypes },
  finder,
} = require('@the-/ast')

/** @lends module:@the-/code.ast.nodes.cleanupRedundantObjectPatternOnObjectExpression */
function cleanupRedundantObjectPatternOnObjectExpression(
  ObjectExpression,
  { get, replace },
) {
  const SpreadObjects = finder
    .findByTypes(ObjectExpression, [NodeTypes.SpreadElement])
    .filter((S) => S.argument.type === NodeTypes.ObjectExpression)
  for (const SpreadElement of SpreadObjects) {
    const {
      argument: { properties },
      leadingComments,
    } = SpreadElement
    if (properties.length === 0) {
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
        properties[0].start,
        properties[properties.length - 1].end,
      ])
      return replace(SpreadElement.range, content)
    }
  }
}
module.exports = cleanupRedundantObjectPatternOnObjectExpression
