'use strict'

const {
  constants: { NodeTypes },
} = require('@the-/ast')

/**
 * @memberof module:@the-/code.ast.nodes
 * @function normalizeAssignmentOnVariableDeclarationNode
 * @returns {*}
 */
function normalizeAssignmentOnVariableDeclarationNode(
  VariableDeclaration,
  { replace },
) {
  const {
    declarations: [declaration],
  } = VariableDeclaration

  const scopesFor = (namespace, ObjectPattern) =>
    Object.assign(
      {},
      ...(ObjectPattern.properties || {})
        .filter((property) => property.type !== NodeTypes.RestElement)
        .filter((property) => property.value.type === NodeTypes.Identifier)
        .map((property) => ({
          [property.value.name]: [namespace, property.value.name].join('.'),
        })),
    )
  if (declaration.id.type !== NodeTypes.ObjectPattern) {
    return
  }

  const scopes =
    declaration.init && declaration.init.type === NodeTypes.Identifier
      ? scopesFor(declaration.init.name, declaration.id)
      : {}
  const AssignmentPatterns = declaration.id.properties
    .map(({ value }) => value)
    .filter(Boolean)
    .filter((value) => value.type === NodeTypes.AssignmentPattern)
  for (const AssignmentPattern of AssignmentPatterns) {
    const { right } = AssignmentPattern
    if (right.type !== NodeTypes.Identifier) {
      continue
    }

    if (right.name in scopes) {
      return replace(right.range, scopes[right.name])
    }
  }
}

module.exports = normalizeAssignmentOnVariableDeclarationNode
