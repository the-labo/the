'use strict'

const {
  constants: { NodeTypes },
} = require('@the-/ast')

/**
 * Cleanup unused function node
 * @memberof module:@the-/code.ast.nodes
 * @function cleanupUnusedOnFunctionArgumentNode
 * @returns {*}
 */
function cleanupUnusedArgumentsOnFunctionNode(
  FunctionNode,
  { ConsumingIdentifiers, enclosedRange, replace },
) {
  const lastParam = FunctionNode.params[FunctionNode.params.length - 1]
  if (!lastParam) {
    return
  }

  const isObjectAssigment =
    lastParam.type === NodeTypes.AssignmentPattern &&
    lastParam.left &&
    lastParam.left.type === NodeTypes.ObjectPattern
  if (isObjectAssigment) {
    const { left: ObjectNode } = lastParam
    const prevParam = FunctionNode.params[FunctionNode.params.length - 2]
    const isEmpty = ObjectNode.properties.length === 0
    if (isEmpty) {
      return replace(
        [prevParam ? prevParam.end : lastParam.start, lastParam.end],
        '',
      )
    }
  }

  const skip = lastParam.type !== 'Identifier'
  if (skip) {
    return
  }

  const {
    params: [firstParam],
  } = FunctionNode
  const usages = ConsumingIdentifiers.filter(
    (Identifier) => Identifier !== lastParam,
  ).filter((Identifier) => Identifier.name === lastParam.name)
  const isValid = usages.length > 0
  if (isValid) {
    return
  }

  const prevParam = FunctionNode.params[FunctionNode.params.length - 2]
  const paramsRange = enclosedRange([firstParam.start, lastParam.end], {
    left: '(',
    right: ')',
  })
  if (paramsRange[0] < FunctionNode.start) {
    return replace([firstParam.start, firstParam.end], '()')
  }

  const start = prevParam ? prevParam.end : lastParam.start
  const end = paramsRange[1] - 1
  return replace([start, end], '')
}

module.exports = cleanupUnusedArgumentsOnFunctionNode
