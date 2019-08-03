'use strict'

/**
 * Process array
 * @memberof module:@the-/code.processors
 * @function processJSArray
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

/** @lends module:@the-/code.processors.processJSArray */
function processJSArray(content, options = {}) {
  function cleanupRedundantArrayPatternOnArrayExpression(
    ArrayExpression,
    { get, replace },
  ) {
    const SpreadArrays = finder
      .findByTypes(ArrayExpression, [NodeTypes.SpreadElement])
      .filter((S) => S.argument.type === NodeTypes.ArrayExpression)
    for (const SpreadElement of SpreadArrays) {
      const {
        argument: { elements },
        leadingComments,
      } = SpreadElement
      if (elements.length === 0) {
        return replace(
          [
            leadingComments ? leadingComments[0].start : SpreadElement.start,
            SpreadElement.end,
          ],
          '',
        )
      }
      if (!leadingComments) {
        const content = get([
          elements[0].start,
          elements[elements.length - 1].end,
        ])
        return replace(SpreadElement.range, content)
      }
    }
  }

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
