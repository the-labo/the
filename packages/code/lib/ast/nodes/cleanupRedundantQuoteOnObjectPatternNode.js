'use strict'

/**
 * @memberof module:@the-/code.ast.nodes
 * @function cleanupRedundantAliasOnObjectPatternNode
 */
/** @lends module:@the-/code.ast.nodes.cleanupRedundantAliasOnObjectPatternNode */
function cleanupRedundantAliasOnObjectPatternNode(ObjectPattern, { replace }) {
  const { properties } = ObjectPattern
  if (!properties) {
    return null
  }

  for (let i = 0; i < properties.length; i++) {
    const property = properties[i]
    if (property.computed) {
      continue
    }

    if (!property.key) {
      continue
    }

    if (property.key.type !== 'StringLiteral') {
      continue
    }

    const {
      key: { value },
    } = property
    const canBeIdentifier = /^[a-zA-Z_]*$/.test(value) && value.length > 0
    if (canBeIdentifier) {
      return replace([property.key.start, property.key.end], value)
    }
  }
  return null
}

module.exports = cleanupRedundantAliasOnObjectPatternNode
