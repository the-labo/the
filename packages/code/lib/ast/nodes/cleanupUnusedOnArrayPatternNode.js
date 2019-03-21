/**
 * @memberof module:the-code/lib/ast/nodes
 * @function cleanupUnusedOnArrayPatternNode
 */
'use strict'

/** @lends cleanupUnusedOnArrayPatternNode */
function cleanupUnusedOnArrayPatternNode(
  ArrayPattern,
  { ConsumingIdentifiers, replace },
) {
  const { elements } = ArrayPattern
  if (!elements) {
    return null
  }
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i]
    if (!element) {
      continue
    }
    const prevElement = elements[i - 1]
    switch (element.type) {
      case 'Identifier': {
        const usages = ConsumingIdentifiers.filter(
          (Identifier) => Identifier !== element,
        ).filter((Identifier) => Identifier.name === element.name)
        const unused = usages.length === 0
        if (unused) {
          const start = prevElement ? prevElement.end + 1 : element.start
          const end = element.end
          return replace([start, end], '')
        }
        break
      }
      case 'RestElement':
        const usages = ConsumingIdentifiers.filter(
          (Identifier) => Identifier !== element.argument,
        ).filter((Identifier) => Identifier.name === element.argument.name)
        const unused = usages.length === 0
        if (unused) {
          const start = prevElement ? prevElement.end + 1 : element.start
          const end = element.end
          return replace([start, end], '')
        }
        break
      default:
        break
    }
  }
}

module.exports = cleanupUnusedOnArrayPatternNode
