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
    const { get, replace } = contentAccess(content)

    const convertExpressionContainer = (Container) => {
      const { expression, range } = Container
      switch (expression && expression.type) {
        case NodeTypes.JSXElement:
          return replace(range, get(expression.range))
        case NodeTypes.StringLiteral:
          return replace(range, expression.value)
        default:
          return
      }
    }
    const convertElement = (Elm) => {
      const Containers = Elm.children.filter(
        (node) => node.type === NodeTypes.JSXExpressionContainer,
      )
      for (const Container of Containers) {
        const converted = convertExpressionContainer(Container)
        if (converted) {
          return converted
        }
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
