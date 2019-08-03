'use strict'

/**
 * @memberof module:@the-/code.ast.nodes
 * @function cleanupEmptyObjectPatternParamsOnFunctionNode
 */
/** @lends module:@the-/code.ast.nodes.cleanupEmptyObjectPatternParamsOnFunctionNode */
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
