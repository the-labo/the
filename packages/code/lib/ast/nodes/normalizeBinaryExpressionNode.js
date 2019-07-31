'use strict'

/**
 * @memberof module:@the-/code.ast.nodes
 * @function normalizeBinaryExpressionNode
 */
const {
  constants: { NodeTypes },
} = require('@the-/ast')

const OperatorsToConvert = {}

const equalityOperators = new Set(['==', '===', '!=', '!=='])
const LiteralTypes = new Set([
  NodeTypes.StringLiteral,
  NodeTypes.NumericLiteral,
  NodeTypes.TemplateLiteral,
  NodeTypes.NullLiteral,
  NodeTypes.BooleanLiteral,
  NodeTypes.BigIntLiteral,
  NodeTypes.RegExpLiteral,
])

/** @lends module:@the-/code.ast.nodes.normalizeBinaryExpressionNode */
function normalizeBinaryExpressionNode(BinaryExpression, { get, replace }) {
  const { end, left, operator, right, start } = BinaryExpression
  if (operator in OperatorsToConvert) {
    return replace([left.end, right.start], ` ${OperatorsToConvert[operator]} `)
  }

  const shouldFixYoda =
    equalityOperators.has(operator) &&
    LiteralTypes.has(left.type) &&
    right.type === NodeTypes.Identifier
  if (shouldFixYoda) {
    return replace(
      [start, end],
      [
        get([right.start, right.end]),
        operator,
        get([left.start, left.end]),
      ].join(' '),
    )
  }
}

module.exports = normalizeBinaryExpressionNode
