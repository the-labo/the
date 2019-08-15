'use strict'

const {
  constants: { NodeTypes },
  finder,
} = require('@the-/ast')

/**
 * @memberof module:@the-/code.ast.nodes
 * @function cleanupRedundantObjectPatternOnObjectExpression
 */
function cleanupRedundantObjectPatternOnObjectExpression(
  ObjectExpression,
  { get, replace },
) {
  const SpreadElement = finder
    .findByTypes(ObjectExpression, [NodeTypes.SpreadElement])
    .find((S) => S.argument.type === NodeTypes.ObjectExpression)
  if (!SpreadElement) {
    return
  }

  const {
    argument: { properties },
    leadingComments,
  } = SpreadElement
  const range = [
    leadingComments ? leadingComments[0].start : SpreadElement.start,
    SpreadElement.end,
  ]
  if (properties.length === 0) {
    return replace(range, '')
  }

  const content = get([
    properties[0].start,
    properties[properties.length - 1].end,
  ])
  return replace(range, content)
}

module.exports = cleanupRedundantObjectPatternOnObjectExpression
