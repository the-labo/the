'use strict'

/**
 * @memberof module:@the-/code.ast.nodes
 * @function mergeStringConcatenateOnBinaryExpressionNode
 */
function mergeStringConcatenateOnBinaryExpressionNode(
  BinaryExpression,
  { get, replace },
) {
  const { left, right } = BinaryExpression

  const content = [left, right]
    .map((node) => {
      switch (node.type) {
        case 'StringLiteral':
          return node.value.replace(/`/g, '\\`').replace(/\${/g, '\\${')
        case 'TemplateLiteral':
          return get([
            node.quasis[0].start,
            node.quasis[node.quasis.length - 1].end,
          ])
        default:
          return `\${${get([node.start, node.end])}}`
      }
    })
    .join('')
  return replace(
    [BinaryExpression.start, BinaryExpression.end],
    `\`${content}\``,
  )
}

module.exports = mergeStringConcatenateOnBinaryExpressionNode
