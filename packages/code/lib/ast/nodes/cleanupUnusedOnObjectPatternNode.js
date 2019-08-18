'use strict'

const {
  isAssignmentPattern,
  isObjectPattern,
} = require('../../helpers/astHelper')

/**
 * @memberof module:@the-/code.ast.nodes
 * @function cleanupUnusedOnObjectPatternNode
 * @returns {*}
 */
function cleanupUnusedOnObjectPatternNode(
  ObjectPattern,
  { ConsumingIdentifiers, replace },
) {
  const { properties } = ObjectPattern
  if (!properties) {
    return null
  }

  for (let i = 0; i < properties.length; i++) {
    const property = properties[i]
    if (!property.key) {
      continue
    }

    const prevProperty = properties[i - 1]
    const nextProperty = properties[i + 1]

    const removeProperty = () => {
      const start = prevProperty ? prevProperty.end + 1 : property.start
      const end = nextProperty ? nextProperty.start : ObjectPattern.end - 1
      return replace([start, end], '')
    }

    const hasObjectPatternValue = property.value.type === 'ObjectPattern'

    if (hasObjectPatternValue) {
      const isEmptyObjectPattern = property.value.properties.length === 0
      if (isEmptyObjectPattern) {
        return removeProperty()
      } else {
        continue
      }
    }

    const hasArrayPatternValue = property.value.type === 'ArrayPattern'
    if (hasArrayPatternValue) {
      const isEmptyArrayPattern = property.value.elements.length === 0
      if (isEmptyArrayPattern) {
        return removeProperty()
      } else {
        continue
      }
    }

    const isAssigment = isAssignmentPattern(property.value)
    const skip = isObjectPattern(property.value) && !isAssigment
    if (skip) {
      continue
    }

    const name =
      (property.value.left && property.value.left.name) ||
      property.value.name ||
      property.key.name
    const usages = ConsumingIdentifiers.filter(
      (Identifier) => Identifier !== property.key,
    )
      .filter((Identifier) => Identifier !== property.value)
      .filter(
        (Identifier) => !isAssigment || Identifier !== property.value.left,
      )
      .filter((Identifier) => Identifier.name === name)
    const unused = usages.length === 0
    if (unused) {
      return removeProperty()
    }
  }
}

module.exports = cleanupUnusedOnObjectPatternNode
