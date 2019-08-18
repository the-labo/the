'use strict'

const {
  constants: { NodeTypes },
} = require('@the-/ast')

/**
 * @memberof module:@the-/code.ast.nodes
 * @function combinePropertiesOnObjectPattern
 * @returns {*}
 */
function combinePropertiesOnObjectPattern(objectPatternNode, { get, replace }) {
  if (objectPatternNode.type !== NodeTypes.ObjectPattern) {
    return
  }

  for (const property of objectPatternNode.properties) {
    const { value } = property
    const isNestedObjectPattern =
      !!value && value.type === NodeTypes.ObjectPattern
    if (isNestedObjectPattern) {
      const combined = combinePropertiesOnObjectPattern(value, { get, replace })
      if (combined) {
        return combined
      }
    }
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
