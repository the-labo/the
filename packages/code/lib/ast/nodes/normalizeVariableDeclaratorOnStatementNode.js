/**
 * @memberof module:@the-/code.ast.nodes
 * @function normalizeVariableDeclaratorOnStatementNode
 */
'use strict'

const { EOL } = require('os')
const {
  constants: { NodeTypes },
  finder,
} = require('@the-/ast')

/** @lends module:@the-/code.ast.nodes.normalizeVariableDeclaratorOnStatementNode */
function normalizeVariableDeclaratorOnStatementNode(
  Statement,
  { get, replace },
) {
  const VariableDeclarations = finder.findByTypes(Statement, [
    NodeTypes.VariableDeclaration,
  ])
  const AssignmentExpressions = finder.findByTypes(Statement, [
    NodeTypes.AssignmentExpression,
  ])
  const UpdateExpressions = finder.findByTypes(Statement, [
    NodeTypes.UpdateExpression,
  ])
  const assignedNames = new Set(
    AssignmentExpressions.filter((ex) => ex.left.type === 'Identifier').map(
      (ex) => ex.left.name,
    ),
  )
  const updatedNames = new Set(
    UpdateExpressions.filter((ex) => ex.argument.type === 'Identifier').map(
      (ex) => ex.argument.name,
    ),
  )
  for (const VariableDeclaration of VariableDeclarations) {
    const { declarations, kind } = VariableDeclaration
    if (declarations.length === 0) {
      continue
    }
    if (declarations.length > 1) {
      const padding = VariableDeclaration.loc.start.column
      const prefix = new Array(padding).fill(' ').join('')
      return replace(
        [VariableDeclaration.start, VariableDeclaration.end],
        declarations
          .map(({ end, id }) => `${kind} ${get([id.start, end])}`)
          .join(EOL + prefix),
      )
    }
    const [declaration] = declarations
    const { id } = declaration
    const hasAssigned = assignedNames.has(id.name) || updatedNames.has(id.name)
    const isLet = kind === 'let'
    const isVar = kind === 'var'
    const shouldConst =
      (isLet || isVar) && id.type === 'Identifier' && !hasAssigned
    if (shouldConst) {
      return replace(
        [VariableDeclaration.start, declaration.id.start],
        'const ',
      )
    }
    if (isVar) {
      return replace([VariableDeclaration.start, declaration.id.start], 'let ')
    }
  }
}

module.exports = normalizeVariableDeclaratorOnStatementNode
