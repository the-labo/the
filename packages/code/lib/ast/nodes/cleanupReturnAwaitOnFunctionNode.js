/**
 * @memberof module:@the-/code.ast.nodes
 * @function cleanupReturnAwaitOnFunctionNode
 */
'use strict'

const {
  constants: { NodeTypes },
  finder,
} = require('@the-/ast')

/** @lends module:@the-/code.ast.nodes.cleanupReturnAwaitOnFunctionNode */
function cleanupReturnAwaitOnFunctionNode(FunctionNode, { get, replace }) {
  if (!FunctionNode.async) {
    return
  }
  const TryNodes = finder.findByTypes(FunctionNode, [NodeTypes.TryStatement])
  const TryReturns = TryNodes.reduce(
    (reduced, TryNode) => [
      ...reduced,
      ...finder.findByTypes(TryNode, [NodeTypes.ReturnStatement]),
    ],
    [],
  )
  if (FunctionNode.body && FunctionNode.body.type === 'AwaitExpression') {
    const AwaitNode = FunctionNode.body
    return replace(
      [AwaitNode.start, AwaitNode.end],
      get([AwaitNode.argument.start, AwaitNode.argument.end]),
    )
  }
  const Returns = finder.findByTypes(FunctionNode, [NodeTypes.ReturnStatement])
  for (const Return of Returns) {
    if (TryReturns.includes(Return)) {
      continue
    }
    if (!Return.argument) {
      continue
    }
    const isAwait = Return.argument.type === 'AwaitExpression'
    if (isAwait) {
      const AwaitNode = Return.argument
      return replace(
        [AwaitNode.start, AwaitNode.end],
        get([AwaitNode.argument.start, AwaitNode.argument.end]),
      )
    }
  }
}

module.exports = cleanupReturnAwaitOnFunctionNode
