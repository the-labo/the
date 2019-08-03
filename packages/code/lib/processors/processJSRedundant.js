'use strict'

/**
 * Removed unused vars
 * @memberof module:@the-/code.processors
 * @function processJSRedundant
 * @param {string} content
 * @returns {string} processed
 */
const {
  constants: { NodeTypes },
  finder,
  parse,
} = require('@the-/ast')
const applyConverter = require('../helpers/applyConverter')
const contentAccess = require('../helpers/contentAccess')

/** @lends module:@the-/code.processors.processJSRedundant */
function processJSRedundant(content, options = {}) {
  function cleanupDuplicateLogicalExpression(
    LogicalExpression,
    { get, replace },
  ) {
    if (!LogicalExpression) {
      return
    }
    const { left, right } = LogicalExpression
    const duplicate =
      left.type === NodeTypes.BinaryExpression &&
      get(left.range) === get(right.range)
    if (duplicate) {
      return replace(LogicalExpression.range, get(left.range))
    }
  }

  return applyConverter(
    content,
    (content) => {
      const parsed = parse(content, options)
      const LogicalExpressions = finder.findByTypes(parsed, [
        NodeTypes.LogicalExpression,
      ])
      const { get, replace } = contentAccess(content)
      for (const LogicalExpression of LogicalExpressions) {
        const converted = cleanupDuplicateLogicalExpression(LogicalExpression, {
          get,
          replace,
        })
        if (converted) {
          return converted
        }
      }

      return content
    },
    { name: 'processJSRedundant' },
  )
}

module.exports = processJSRedundant
