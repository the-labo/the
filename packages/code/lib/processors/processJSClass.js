'use strict'

/**
 * @memberof module:@the-/code.processors
 * @function processJSClass
 * @param {string} content
 * @returns {string} processed
 */
const {
  constants: { NodeTypes },
  finder,
  parse,
} = require('@the-/ast')
const { sortMethodsOnClassNode } = require('../ast/nodes')
const applyConverter = require('../helpers/applyConverter')
const contentAccess = require('../helpers/contentAccess')

/** @lends module:@the-/code.processors.processJSClass */
function processJSClass(content, options = {}) {
  return applyConverter(
    content,
    (content) => {
      const parsed = parse(content, options)
      const { swap } = contentAccess(content)

      const Classes = finder.findByTypes(parsed, [
        NodeTypes.ClassDeclaration,
        NodeTypes.ClassExpression,
      ])

      for (const Class of Classes) {
        const converted = sortMethodsOnClassNode(Class.body, {
          swap,
        })
        if (converted) {
          return converted
        }
      }
      return content
    },
    { name: 'processJSClass' },
  )
}

module.exports = processJSClass
