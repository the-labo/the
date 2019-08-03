'use strict'

/**
 * @memberof module:@the-/code.processors
 * @function processJSBinaryExpression
 * @param {string} content
 * @returns {string} processed
 */
const {
  constants: { NodeTypes },
  finder,
  parse,
} = require('@the-/ast')
const calcNumericOperationOnBinaryExpressionNode = require('../ast/nodes/calcNumericOperationOnBinaryExpressionNode')
const mergeStringConcatenateOnBinaryExpressionNode = require('../ast/nodes/mergeStringConcatenateOnBinaryExpressionNode')
const normalizeBinaryExpressionNode = require('../ast/nodes/normalizeBinaryExpressionNode')
const applyConverter = require('../helpers/applyConverter')
const contentAccess = require('../helpers/contentAccess')

/** @lends module:@the-/code.processors.processJSBinaryExpression */
function processJSBinaryExpression(content, options = {}) {
  return applyConverter(
    content,
    (content) => {
      const parsed = parse(content, options)
      const { get, replace } = contentAccess(content)

      const BinaryExpressions = finder.findByTypes(parsed, [
        NodeTypes.BinaryExpression,
      ])

      for (const BinaryExpression of BinaryExpressions) {
        const { left, operator, right } = BinaryExpression
        const StringTypes = [NodeTypes.StringLiteral, NodeTypes.TemplateLiteral]
        const isStringConcat =
          operator === '+' &&
          [left, right].some((side) => StringTypes.includes(side.type))
        if (isStringConcat) {
          const merged = mergeStringConcatenateOnBinaryExpressionNode(
            BinaryExpression,
            {
              get,
              replace,
            },
          )
          if (merged) {
            return merged
          }
        }

        const normalized = normalizeBinaryExpressionNode(BinaryExpression, {
          get,
          replace,
        })
        if (normalized) {
          return normalized
        }

        const calculated = calcNumericOperationOnBinaryExpressionNode(
          BinaryExpression,
          { get, replace },
        )
        if (calculated) {
          return calculated
        }
      }
      return content
    },
    { name: 'processJSBinaryExpression' },
  )
}

module.exports = processJSBinaryExpression
