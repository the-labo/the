/**
 * Process JSX attributes
 * @memberOf module:@the-/code.processors
 * @function processJSXAttribute
 * @param {string} content
 * @returns {string} processed
 */
'use strict'

const {
  constants: { NodeTypes },
  finder,
  parse,
} = require('@the-/ast')
const applyConverter = require('../helpers/applyConverter')
const { compareBy, compareStrings } = require('../helpers/arrayHelper')
const contentAccess = require('../helpers/contentAccess')

/** @lends module:@the-/code.processors.processJSXAttribute */
function processJSXAttribute(content, options = {}) {
  const nameOfAttribute = (attribute) => {
    return attribute.name.name
  }
  const rangeFor = (attribute) => {
    return [attribute.start, attribute.end]
  }
  return applyConverter(content, (content) => {
    const parsed = parse(content, options)
    const { swap } = contentAccess(content)

    function swapAttributes(elm) {
      const attributes = elm.openingElement.attributes
      if (attributes.length === 0) {
        return
      }
      const sortableAttributes = attributes.reduce(
        (sliced, attribute) => {
          if (attribute.type === 'JSXSpreadAttribute') {
            sliced.push([])
          } else {
            sliced[sliced.length - 1].push(attribute)
          }
          return sliced
        },
        [[]],
      )
      for (const attributes of sortableAttributes) {
        const sortedByStart = [...attributes].sort(compareBy('start'))
        const sortedByName = [...attributes].sort((a, b) => {
          return compareStrings(nameOfAttribute(a), nameOfAttribute(b))
        })

        for (let i = 0; i < sortedByStart.length; i++) {
          const byStart = sortedByStart[i]
          const byName = sortedByName[i]
          if (byStart.start !== byName.start) {
            return swap(rangeFor(byStart), rangeFor(byName))
          }
        }
      }
    }

    function convertElement(elm) {
      const converted = swapAttributes(elm)
      if (converted) {
        return converted
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

module.exports = processJSXAttribute
