'use strict'

const { EOL } = require('os')
const {
  constants: { NodeTypes },
} = require('@the-/ast')
const combinePropertiesOnObjectPattern = require('./combinePropertiesOnObjectPattern')

function combineOnVariableDeclarationNodes(
  VariableDeclarations,
  { get, replace },
) {
  for (const VariableDeclaration of VariableDeclarations) {
    for (const declaration of VariableDeclaration.declarations) {
      const combined = combinePropertiesOnObjectPattern(declaration.id, {
        get,
        replace,
      })
      if (combined) {
        return combined
      }
    }
  }

  if (VariableDeclarations.length < 2) {
    return
  }
  const [first, ...restDeclarations] = VariableDeclarations
  const {
    declarations: [{ init }],
    kind,
  } = first
  const last = VariableDeclarations[VariableDeclarations.length - 1]
  const properties = VariableDeclarations.map((v) => v.declarations[0])
    .reduce(
      (properties, declaration) => [
        ...properties,
        ...declaration.id.properties,
      ],
      [],
    )
    .filter(Boolean)

  const resetElements = properties.filter(
    (property) => property.type === NodeTypes.RestElement,
  )
  if (resetElements.length > 1) {
    return
  }

  const id = `{${[
    ...properties.filter((p) => !resetElements.some((r) => r === p)),
    ...resetElements,
  ]
    .map((property) => get(property.range))
    .join(', ')}}`

  return replace(
    [first.start, last.end],
    [
      `${kind} ${id} = ${get([init.start, init.end])}`,
      ...restDeclarations.map((cur, i, arr) => {
        const prev = arr[i - 1] || first
        return get([prev.end, cur.start])
      }),
    ]
      .join('')
      .split(EOL)
      .filter((line, i, lines) => {
        const prev = lines[i - 1]
        const skip = line === '' && i > 0 && prev === ''
        return !skip
      })
      .join(EOL),
  )
}

module.exports = combineOnVariableDeclarationNodes
