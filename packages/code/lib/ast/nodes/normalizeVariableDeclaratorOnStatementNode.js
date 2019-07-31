'use strict'

/**
 * @memberof module:@the-/code.ast.nodes
 * @function normalizeVariableDeclaratorOnStatementNode
 */
const { EOL } = require('os')
const {
  constants: { NodeTypes },
  finder,
} = require('@the-/ast')
const modifyToDestructorOnDeclarationNode = require('./modifyToDestructorOnDeclarationNode')
const normalizeAssignmentOnVariableDeclarationNode = require('./normalizeAssignmentOnVariableDeclarationNode')
const normalizeKindOnVariableDeclarationNode = require('./normalizeKindOnVariableDeclarationNode')

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
      const {
        loc: {
          start: { column: padding },
        },
      } = VariableDeclaration
      const prefix = new Array(padding).fill(' ').join('')
      return replace(
        [VariableDeclaration.start, VariableDeclaration.end],
        declarations
          .map(({ end, id }) => `${kind} ${get([id.start, end])}`)
          .join(EOL + prefix),
      )
    }

    const modified =
      normalizeKindOnVariableDeclarationNode(VariableDeclaration, {
        assignedNames,
        get,
        replace,
        updatedNames,
      }) ||
      normalizeAssignmentOnVariableDeclarationNode(VariableDeclaration, {
        get,
        replace,
      }) ||
      modifyToDestructorOnDeclarationNode(VariableDeclaration, {
        get,
        replace,
      })
    if (modified) {
      return modified
    }
  }
}

module.exports = normalizeVariableDeclaratorOnStatementNode
