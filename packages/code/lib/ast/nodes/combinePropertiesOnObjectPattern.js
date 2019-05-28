/**
 * @memberof module:@the-/code.ast.nodes
 * @function combinePropertiesOnObjectPattern
 */
'use strict'

const {
  constants: { NodeTypes },
} = require('@the-/ast')

/** @lends module:@the-/code.ast.nodes.combinePropertiesOnObjectPattern */
function combinePropertiesOnObjectPattern(objectPatternNode, { get, replace }) {
  if (objectPatternNode.type !== NodeTypes.ObjectPattern) {
    return
  }
  const objectPropertyHash = objectPatternNode.properties
    .filter(
      (property) =>
        !!property.key &&
        property.key.type === NodeTypes.Identifier &&
        !!property.value &&
        property.value.type === NodeTypes.ObjectPattern,
    )
    .reduce((reduced, property) => {
      const {
        key: { name: keyName },
      } = property
      const existing = reduced.hasOwnProperty(keyName) ? reduced[keyName] : []
      return {
        ...reduced,
        [keyName]: [...existing, property],
      }
    }, {})

  for (const [key, combiningProperties] of Object.entries(objectPropertyHash)) {
    if (combiningProperties.length < 2) {
      continue
    }
    const content = `${key}: { ${combiningProperties
      .map((property) =>
        (property.value.properties || [])
          .map((innerProperty) => get(innerProperty.range))
          .join(', '),
      )
      .join(', ')} }`
    const otherProperties = objectPatternNode.properties.filter(
      (property) =>
        !combiningProperties.some(
          (combiningProperty) => combiningProperty === property,
        ),
    )
    return replace(
      [objectPatternNode.start, objectPatternNode.end],
      `{ ${[
        content,
        ...otherProperties.map((property) => get(property.range)),
      ].join(', ')} }`,
    )
  }
}

module.exports = combinePropertiesOnObjectPattern
