/**
 * @memberof module:the-code
 * @function cleanupRedundantAliasOnObjectPatternNode
 */
'use strict'

/** @lends cleanupRedundantAliasOnObjectPatternNode */
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
    const { value } = property.key
    const canBeIdentifier = /^[a-zA-Z_]*$/.test(value)
    if (canBeIdentifier) {
      return replace([property.key.start, property.key.end], value)
    }
  }
  return null
}

module.exports = cleanupRedundantAliasOnObjectPatternNode
