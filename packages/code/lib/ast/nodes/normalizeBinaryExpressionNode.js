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
  '>': '<',
  '>=': '<=',
}

const equalityOperators = ['==', '===', '!=', '!==']
/** @lends module:@the-/code.ast.nodes.normalizeBinaryExpressionNode */
function normalizeBinaryExpressionNode(BinaryExpression, { get, replace }) {
  const { end, left, operator, right, start } = BinaryExpression
  if (operator in OperatorsToConvert) {
    return replace([left.end, right.start], ` ${OperatorsToConvert[operator]} `)
  }
  const shouldFixYoda =
    equalityOperators.includes(operator) &&
    left.type !== NodeTypes.Identifier &&
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
  if (operator in OperatorsToSwap) {
    return replace(
      [start, end],
      [
        get([right.start, right.end]),
        OperatorsToSwap[operator],
        get([left.start, left.end]),
      ].join(' '),
    )
  }
}

module.exports = normalizeBinaryExpressionNode
