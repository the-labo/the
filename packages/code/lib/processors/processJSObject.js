'use strict'

const {
  constants: { NodeTypes },
  finder,
  parse,
} = require('@the-/ast')
const {
  cleanupEmptyLineBetweenPropertiesOnObjectExpressionNode,
  cleanupRedundantAliasOnObjectPatternNode,
  cleanupRedundantObjectPatternOnObjectExpression,
  cleanupRedundantQuoteOnObjectPatternNode,
  sortPropertiesOnObjectNode,
} = require('../ast/nodes')
const applyConverter = require('../helpers/applyConverter')
const applyToNodes = require('../helpers/applyToNodes')
const { byType } = require('../helpers/arrayHelper')
const contentAccess = require('../helpers/contentAccess')

/**
 * Process objects
 * @memberof module:@the-/code.processors
 * @function processJSObject
 * @param {string} content
 * @returns {string} processed
 */
function processJSObject(content, options = {}) {
  return applyConverter(
    content,
    (content) => {
      const parsed = parse(content, options)
      const { get, removeLine, replace, swap } = contentAccess(content)

      function convertObjectNode(ObjectNode) {
        const converted =
          sortPropertiesOnObjectNode(ObjectNode, {
            get,
            swap,
          }) ||
          cleanupRedundantAliasOnObjectPatternNode(ObjectNode, {
            replace,
          }) ||
          cleanupRedundantQuoteOnObjectPatternNode(ObjectNode, {
            replace,
          }) ||
          cleanupRedundantObjectPatternOnObjectExpression(ObjectNode, {
            get,
            replace,
          }) ||
          cleanupEmptyLineBetweenPropertiesOnObjectExpressionNode(ObjectNode, {
            removeLine,
          })
        if (converted) {
          return converted
        }

        {
          const ObjectSpreadElements = (ObjectNode.properties || [])
            .filter(byType('SpreadElement'))
            .filter(
              ({ argument }) =>
                argument && argument.type === 'ObjectExpression',
            )
          const Objects = ObjectSpreadElements.map(
            ({ argument }) => argument,
          ).filter(Boolean)
          const converted = applyToNodes(Objects, convertObjectNode)
          if (converted) {
            return converted
          }
        }
      }

      const Objects = finder.findByTypes(parsed, [
        NodeTypes.ObjectExpression,
        NodeTypes.ObjectPattern,
      ])
      const converted = applyToNodes(Objects, convertObjectNode)
      if (converted) {
        return converted
      }

      return content
    },
    { name: 'processJSObject' },
  )
}

module.exports = processJSObject
