'use strict'
/**
 * @memberof module:@the-/code.processors
 * @function processJSString
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

/** @lends module:@the-/code.processors.processJSString */
function processJSString(content, options = {}) {
  return applyConverter(
    content,
    (content) => {
      const parsed = parse(content, options)
      const { replace } = contentAccess(content)
      const templates = finder.findByTypes(parsed, [NodeTypes.TemplateLiteral])
      const quotableTemplates = templates
        .filter(
          (template) =>
            !template.expressions || template.expressions.length === 0,
        )
        .filter((template) => template.loc.start.line === template.loc.end.line)
      for (const template of quotableTemplates) {
        const [content] = template.quasis || []
        if (content) {
          const newContent = content.value.raw.replace(/'/g, "\\'")
          return replace([template.start, template.end], `'${newContent}'`)
        }
      }
      return content
    },
    { name: 'processJSString' },
  )
}

module.exports = processJSString
