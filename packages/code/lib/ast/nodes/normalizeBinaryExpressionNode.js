/**
 * @memberof module:@the-/code.ast.nodes
 * @function normalizeBinaryExpressionNode
 */
'use strict'

const {
  constants: { NodeTypes },
} = require('@the-/ast')

const OperatorsToConvert = {}

const OperatorsToSwap = {
  '<': '>',
  '<=': '>=',
  '>': '<',
  '>=': '<=',
}

/** @lends module:@the-/code.ast.nodes.normalizeBinaryExpressionNode */
function normalizeBinaryExpressionNode(BinaryExpression, { get, replace }) {
  const { end, left, operator, right, start } = BinaryExpression
  if (operator in OperatorsToConvert) {
    return replace([left.end, right.start], ` ${OperatorsToConvert[operator]} `)
  }
  const isYoda =
    left.type !== NodeTypes.Identifier && right.type === NodeTypes.Identifier
  if (isYoda) {
    return replace(
      [start, end],
      [
        get([right.start, right.end]),
        OperatorsToSwap[operator] || operator,
        get([left.start, left.end]),
      ].join(' '),
    )
  }
}

module.exports = normalizeBinaryExpressionNode
