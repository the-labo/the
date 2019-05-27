'use strict'
/**
 * Process if statemens
 * @memberof module:@the-/code.processors
 * @function processJSIf
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

/** @lends module:@the-/code.processors.processJSIf */
function processJSIf(content, options = {}) {
  return applyConverter(
    content,
    (content) => {
      const parsed = parse(content, options)
      const { comments } = parsed
      const { replace } = contentAccess(content)

      const IfStatements = finder.findByTypes(parsed, [NodeTypes.IfStatement])

      const hasContent = (node) => {
        const { body, end, expression, start } = node
        if (expression) {
          return true
        }
        if (!body) {
          return false
        }
        return (
          body.length > 0 ||
          comments.some(
            (comment) => start <= comment.start && comment.end <= end,
          )
        )
      }

      for (const IfStatement of IfStatements.reverse()) {
        const { alternate, consequent } = IfStatement
        const hasEmptyAlternate =
          !!alternate && !alternate.alternate && !hasContent(alternate)
        if (hasEmptyAlternate) {
          return replace([consequent.end, alternate.end], '')
        }

        const hasEmptyElseIf =
          alternate &&
          alternate.type === NodeTypes.IfStatement &&
          !alternate.alternate &&
          !hasContent(alternate.consequent)
        if (hasEmptyElseIf) {
          return replace([consequent.end, alternate.consequent.end], '')
        }
      }

      return content
    },
    { name: 'processJSIf' },
  )
}

module.exports = processJSIf
