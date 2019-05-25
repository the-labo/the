/**
 * @memberof module:@the-/code.ast.nodes
 * @function normalizeFunctionBodyOnFunctionNode
 */
'use strict'
const {
  constants: { NodeTypes },
} = require('@the-/ast')

/** @lends module:@the-/code.ast.nodes.normalizeFunctionBodyOnFunctionNode */
function normalizeFunctionBodyOnFunctionNode(
  FunctionNode,
  { comments, get, replace },
) {
  const { body, type } = FunctionNode
  if (!body.body) {
    return
  }
  const hasComment = comments.some(
    (comment) => body.start <= comment.start && comment.end <= body.end,
  )
  const isOnlyReturn =
    body.body.length === 1 && body.body[0].type === NodeTypes.ReturnStatement
  const canBeExpression =
    type === NodeTypes.ArrowFunctionExpression && !hasComment && isOnlyReturn
  if (canBeExpression) {
    const Return = body.body[0]
    return replace(
      [body.start, body.end],
      get([Return.argument.start, Return.argument.end]),
    )
  }
}

module.exports = normalizeFunctionBodyOnFunctionNode
