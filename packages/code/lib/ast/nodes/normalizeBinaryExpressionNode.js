/**
 * @memberof module:@the-/code.ast.nodes
 * @function normalizeBinaryExpressionNode
 */
'use strict'

const OperatorsToNormalize = {
  '!=': '!==',
  '==': '===',
}

const OperatorsToSwap = {
  '>': '<',
  '>=': '<=',
}

/** @lends module:@the-/code.ast.nodes.normalizeBinaryExpressionNode */
function normalizeBinaryExpressionNode(BinaryExpression, { get, replace }) {
  const { end, left, operator, right, start } = BinaryExpression
  if (operator in OperatorsToNormalize) {
    return replace(
      [left.end, right.start],
      ` ${OperatorsToNormalize[operator]} `,
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
