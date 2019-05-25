'use strict'
/**
 * @memberof module:@the-/code.ast.nodes
 * @function normalizeFunctionReturnOnFunctionNode
 */
const {
  constants: { NodeTypes },
} = require('@the-/ast')

/** @lends module:@the-/code.ast.nodes.normalizeFunctionReturnOnFunctionNode */
function normalizeFunctionReturnOnFunctionNode(
  FunctionNode,
  { comments, get, replace },
) {
  const { body, type } = FunctionNode
  if (!body.body) {
    return
  }
  if (body.type !== NodeTypes.BlockStatement) {
    return
  }
  const Return = body.body.find(
    (Node) => Node.type === NodeTypes.ReturnStatement,
  )
  if (!Return) {
    return
  }
  const hasComment = comments.some(
    (comment) => body.start <= comment.start && comment.end <= body.end,
  )
  const isOnlyReturn = body.body.length === 1
  const canBeExpression =
    type === NodeTypes.ArrowFunctionExpression && !hasComment && isOnlyReturn
  if (canBeExpression) {
    const { argument } = Return
    const needsWrap = argument.type === NodeTypes.ObjectExpression
    const valueString = get([argument.start, argument.end])
    return replace(
      [body.start, body.end],
      needsWrap ? `(${valueString})` : valueString,
    )
  }
}

module.exports = normalizeFunctionReturnOnFunctionNode
