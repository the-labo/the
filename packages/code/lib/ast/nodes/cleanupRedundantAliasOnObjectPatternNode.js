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
    if (property.key.type !== 'Identifier') {
      continue
    }
    if (!property.value) {
      continue
    }
    if (property.key === property.value) {
      continue
    }
    const keyName = property.key.name
    if (property.value.type === 'AssignmentPattern') {
      const valueName = property.value.left.name
      if (keyName !== valueName) {
        continue
      }
      if (property.key.start === property.value.left.start) {
        continue
      }
      return replace([property.key.end, property.value.left.end])
    }
    const valueName = property.value.name
    if (keyName !== valueName) {
      continue
    }
    if (property.key.start === property.value.start) {
      continue
    }
    return replace([property.key.end, property.value.end])
  }
}

module.exports = cleanupRedundantAliasOnObjectPatternNode
