'use strict'

const {
  constants: { NodeTypes },
  finder,
} = require('@the-/ast')

/**
 * @memberof module:@the-/code.ast.nodes
 * @function normalizeFunctionReturnOnFunctionNode
 * @returns {*}
 */
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

  const shouldReturnVariableDirectory =
    body.body.length === 2 &&
    body.body[0].type === NodeTypes.VariableDeclaration &&
    body.body[0].declarations.length === 1 &&
    body.body[1].type === NodeTypes.ReturnStatement &&
    body.body[1].argument.type === NodeTypes.Identifier &&
    body.body[0].declarations[0].id.name === body.body[1].argument.name
  if (shouldReturnVariableDirectory) {
    const {
      body: [
        {
          declarations: [declaration],
          leadingComments,
        },
        Return,
      ],
    } = body
    const usage = finder
      .findByTypes(body, [NodeTypes.Identifier])
      .find(
        (id) =>
          id.start !== declaration.id.start &&
          id.name === declaration.id.name &&
          id.end < Return.start,
      )
    if (!usage) {
      const content = get([declaration.init.start, declaration.init.end])
      const commentContent = leadingComments
        ? get([
            leadingComments[0].start,
            leadingComments[leadingComments.length - 1].end,
          ])
        : ''
      return replace(
        [body.start, body.end],
        `{
  ${commentContent} 
  return ${content} 
}`,
      )
    }
  }
}

module.exports = normalizeFunctionReturnOnFunctionNode
