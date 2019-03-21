/**
 * @memberof module:the-code/lib/ast/nodes
 * @function cleanupEmptyObjectPatternParamsOnFunctionNode
 */
'use strict'

/** @lends cleanupEmptyObjectPatternParamsOnFunctionNode */
function cleanupEmptyObjectPatternParamsOnFunctionNode(
  FunctionNode,
  { replace },
) {
  const { params } = FunctionNode
  const lastParam = params[params.length - 1]
  if (!lastParam) {
    return
  }
  const isObjectPattern = lastParam.type === 'ObjectPattern'
  if (!isObjectPattern) {
    return
  }
  const isEmpty = lastParam.properties.length === 0
  if (isEmpty) {
    return replace([lastParam.start, lastParam.end], '')
  }
}

module.exports = cleanupEmptyObjectPatternParamsOnFunctionNode
