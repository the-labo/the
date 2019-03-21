/**
 * @memberof module:the-code/lib/ast/nodes
 * @function cleanupEmptyArrayPatternParamsOnFunctionNode
 */
'use strict'

/** @lends cleanupEmptyArrayPatternParamsOnFunctionNode */
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
