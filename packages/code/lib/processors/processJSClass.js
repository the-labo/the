/**
 * @memberOf module:the-code/lib/processors
 * @function processClass
 * @param {string} content
 * @returns {string} processed
 */
'use strict'

const {
  constants: { NodeTypes },
  finder,
  parse,
} = require('the-ast')
const { sortMethodsOnClassNode } = require('../ast/nodes')
const applyConverter = require('../helpers/applyConverter')
const contentAccess = require('../helpers/contentAccess')

/** @lends processClass */
function processClass(content, options = {}) {
  return applyConverter(content, (content) => {
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
  })
}

module.exports = processClass
