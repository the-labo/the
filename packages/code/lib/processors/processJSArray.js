/**
 * Process array
 * @memberof module:@the-/code.processors
 * @function processJSArray
 * @param {string} content
 * @returns {string} processed
 */
'use strict'

const {
  constants: { NodeTypes },
  finder,
  parse,
} = require('@the-/ast')
const cleanupRedundantArrayPatternOnArrayExpression = require('../ast/nodes/cleanupRedundantArrayPatternOnArrayExpression')
const applyConverter = require('../helpers/applyConverter')
const contentAccess = require('../helpers/contentAccess')

/** @lends module:@the-/code.processors.processJSArray */
function processJSArray(content, options = {}) {
  return applyConverter(
    content,
    (content) => {
      const parsed = parse(content, options)
      const { get, replace } = contentAccess(content)
      const ArrayExpressions = finder.findByTypes(parsed, [
        NodeTypes.ArrayExpression,
      ])
      for (const ArrayExpression of ArrayExpressions) {
        const converted = cleanupRedundantArrayPatternOnArrayExpression(
          ArrayExpression,
          { get, replace },
        )
        if (converted) {
          return converted
        }
      }
      return content
    },
    { name: 'processJSArray' },
  )
}

module.exports = processJSArray
