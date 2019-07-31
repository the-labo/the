'use strict'

/**
 * Process JSX attributes
 * @memberof module:@the-/code.processors
 * @function processJSXAttribute
 * @param {string} content
 * @returns {string} processed
 */
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
  const nameOfAttribute = (attribute) => attribute.name.name
  const rangeFor = (attribute) => [attribute.start, attribute.end]
  return applyConverter(content, (content) => {
    const parsed = parse(content, options)
    const { get, replace, swap } = contentAccess(content)

    function removeDuplicateAttributes(elm) {
      const {
        openingElement: { attributes },
      } = elm
      const knownNames = new Set()
      for (let i = attributes.length - 1; i >= 0; i--) {
        const attribute = attributes[i]
        const skip = attribute.type === NodeTypes.JSXSpreadAttribute
        if (skip) {
          continue
        }
        const {
          name: { name },
        } = attribute
        if (knownNames.has(name)) {
          const prev = attributes[i - 1]
          const start = prev ? prev.end : attribute.start - 1
          const { end } = attribute
          return replace([start, end], '')
        }
        knownNames.add(name)
      }
    }

    function removeSpreadAttributes(elm) {
      const attributes = elm.openingElement.attributes.filter(
        (a) => a.type === NodeTypes.JSXSpreadAttribute,
      )
      for (const attribute of attributes) {
        const { argument, end, start } = attribute
        if (argument.type !== NodeTypes.ObjectExpression) {
          continue
        }
        const { properties } = argument
        const expandable = properties.some(
          (property) => !property.computed && !!property.value,
        )
        if (!expandable) {
          continue
        }
        return replace(
          [start, end],
          properties
            .map((property) => {
              const { computed, key, method, value } = property
              if (method) {
                return `${key.name}={function ${get([
                  property.start,
                  property.end,
                ])}}`
              }
              if (property.type === NodeTypes.SpreadElement) {
                return `{...${property.argument.name}}`
              }
              const valueContent = get([value.start, value.end])
              if (computed) {
                return `{...{[${key.name}]:${valueContent}}}`
              }
              return `${key.name}={${valueContent}}`
            })
            .join(' '),
        )
      }
    }

    function swapAttributes(elm) {
      const {
        openingElement: { attributes },
      } = elm
      if (attributes.length === 0) {
        return
      }
      const sortableAttributes = attributes.reduce(
        (sliced, attribute) => {
          if (attribute.type === NodeTypes.JSXSpreadAttribute) {
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
        const sortedByName = [...attributes].sort((a, b) =>
          compareStrings(nameOfAttribute(a), nameOfAttribute(b)),
        )

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
      const converted =
        removeDuplicateAttributes(elm) ||
        swapAttributes(elm) ||
        removeSpreadAttributes(elm)
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
