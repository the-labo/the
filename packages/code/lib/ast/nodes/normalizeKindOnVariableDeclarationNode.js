'use strict'

const {
  constants: { NodeTypes },
} = require('@the-/ast')

const propertyNamesFor = (objectPatternNode) => {
  const propertyNames = []
  for (const property of objectPatternNode.properties) {
    if (property.type !== NodeTypes.ObjectProperty) {
      continue
    }

    if (property.computed) {
      continue
    }

    const { value } = property
    if (value.type === NodeTypes.Identifier) {
      propertyNames.push(value.name)
    }

    if (value.type === NodeTypes.ObjectPattern) {
      propertyNames.push(...propertyNamesFor(value))
    }

    if (value.type === NodeTypes.AssignmentPattern) {
      propertyNames.push(value.left.name)
    }
  }
  return propertyNames
}

/**
 * @memberof module:@the-/code.ast.nodes
 * @function normalizeKindOnVariableDeclarationNode
 */
function normalizeKindOnVariableDeclarationNode(
  VariableDeclaration,
  { assignedNames, replace, updatedNames },
) {
  const { declarations, kind } = VariableDeclaration
  if (declarations.length !== 1) {
    return
  }

  const [declaration] = declarations
  const { id } = declaration
  const isLet = kind === 'let'
  const isVar = kind === 'var'
  if (isLet || isVar) {
    switch (id.type) {
      case NodeTypes.Identifier: {
        const hasAssigned =
          assignedNames.has(id.name) || updatedNames.has(id.name)
        if (!hasAssigned) {
          return replace(
            [VariableDeclaration.start, declaration.id.start],
            'const ',
          )
        }

        break
      }
      case NodeTypes.ObjectPattern: {
        const propertyNames = propertyNamesFor(id)
        const hasAssigned = propertyNames.some(
          (name) => assignedNames.has(name) || updatedNames.has(name),
        )
        if (!hasAssigned) {
          return replace(
            [VariableDeclaration.start, declaration.id.start],
            'const ',
          )
        }

        break
      }
      default:
        break
    }
  }

  if (isVar) {
    return replace([VariableDeclaration.start, declaration.id.start], 'let ')
  }
}

module.exports = normalizeKindOnVariableDeclarationNode
