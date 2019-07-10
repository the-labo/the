'use strict'
/**
 * Process JSX attributes
 * @memberof module:@the-/code.processors
 * @function processJSXExpression
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

/** @lends module:@the-/code.processors.processJSXExpression */
function processJSXExpression(content, options = {}) {
  return applyConverter(content, (content) => {
    const parsed = parse(content, options)
    const { replace } = contentAccess(content)

    const convertElement = (Elm) => {
      const Containers = Elm.children.filter(
        (node) => node.type === NodeTypes.JSXExpressionContainer,
      )
      const StringContainer = Containers.find(
        (Container) =>
          Container.expression &&
          Container.expression.type === NodeTypes.StringLiteral,
      )
      if (StringContainer) {
        return replace(StringContainer.range, StringContainer.expression.value)
      }
    }

    const JSXElements = finder.findByTypes(parsed, [NodeTypes.JSXElement])
    for (const JSXElement of JSXElements) {
      const converted = convertElement(JSXElement)
      if (converted) {
        return converted
      }
    }
    return content
  })
}

module.exports = processJSXExpression
