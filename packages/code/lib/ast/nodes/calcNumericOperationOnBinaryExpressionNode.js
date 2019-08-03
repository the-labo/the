/**
 * @memberof module:@the-/code.ast.nodes
 * @function calcNumericOperationOnBinaryExpressionNode
 */
'use strict'

const {
  constants: { NodeTypes },
} = require('@the-/ast')

/** @lends module:@the-/code.ast.nodes.calcNumericOperationOnBinaryExpressionNode */
function calcNumericOperationOnBinaryExpressionNode(
  BinaryExpression,
  { replace },
) {
  const { left, operator, right } = BinaryExpression
  const canCalc =
    left.type === NodeTypes.NumericLiteral &&
    right.type === NodeTypes.NumericLiteral
  if (!canCalc) {
    return
  }

  switch (operator) {
    case '-': {
      return replace(BinaryExpression.range, left.value - right.value)
    }
    case '*': {
      return replace(BinaryExpression.range, left.value * right.value)
    }
    case '/': {
      return replace(BinaryExpression.range, left.value / right.value)
    }
    case '+': {
      return replace(BinaryExpression.range, left.value + right.value)
    }
    case '<': {
      return replace(BinaryExpression.range, left.value < right.value)
    }
    case '<=': {
      return replace(BinaryExpression.range, left.value <= right.value)
    }
    case '>': {
      return replace(BinaryExpression.range, left.value > right.value)
    }
    case '>=': {
      return replace(BinaryExpression.range, left.value >= right.value)
    }
    default:
      break
  }
}

module.exports = calcNumericOperationOnBinaryExpressionNode
