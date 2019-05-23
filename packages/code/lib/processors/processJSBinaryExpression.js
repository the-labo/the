/**
 * @memberof module:@the-/code.processors
 * @function processJSBinaryExpression
 * @param {string} content
 * @returns {string} processed
 */
'use strict'

const {
  constants: { NodeTypes },
  finder,
  parse,
} = require('@the-/ast')
const mergeStringConcatenate = require('../ast/nodes/mergeStringConcatenate')
const applyConverter = require('../helpers/applyConverter')
const contentAccess = require('../helpers/contentAccess')

/** @lends module:@the-/code.processors.processJSBinaryExpression */
function processJSBinaryExpression(content, options = {}) {
  return applyConverter(content, (content) => {
    const parsed = parse(content, options)
    const { get, replace } = contentAccess(content)

    const BinaryExpressions = finder.findByTypes(parsed, [
      NodeTypes.BinaryExpression,
    ])

    for (const BinaryExpression of BinaryExpressions) {
      const { left, right } = BinaryExpression
      const StringTypes = [NodeTypes.StringLiteral, NodeTypes.TemplateLiteral];
      const isStringConcat = [left, right].some(
        (side) => StringTypes.includes(side.type)
      )
      if (isStringConcat) {
        const merged = mergeStringConcatenate(BinaryExpression, {
          get,
          replace,
        })
        if (merged) {
          return merged
        }
      }
    }
    return content
  })
}

module.exports = processJSBinaryExpression
