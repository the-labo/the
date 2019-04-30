/**
 * @memberof module:@the-/code.ast.nodes
 * @function cleanupEmptyArrayPatternParamsOnFunctionNode
 */
'use strict'

/** @lends module:@the-/code.ast.nodes.cleanupEmptyArrayPatternParamsOnFunctionNode */
function cleanupEmptyArrayPatternParamsOnFunctionNode(
  FunctionNode,
  { replace },
) {
  const { params } = FunctionNode
  const lastParam = params[params.length - 1]
  if (!lastParam) {
    return
  }
  const isArrayPattern = lastParam.type === 'ArrayPattern'
  if (!isArrayPattern) {
    return
  }
  const isEmpty = lastParam.elements.length === 0
  if (isEmpty) {
    return replace([lastParam.start, lastParam.end], '')
  }
}

module.exports = cleanupEmptyArrayPatternParamsOnFunctionNode
