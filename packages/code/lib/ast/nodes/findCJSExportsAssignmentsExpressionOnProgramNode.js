/**
 * @memberof module:@the-/code.ast.nodes
 */
'use strict'
const { finder } = require('@the-/ast')

function findCJSExportsAssignmentsExpressionOnProgramNode(ProgramNode) {
  const AssignmentExpressions = finder.findByTypes(ProgramNode, [
    'AssignmentExpression',
  ])

  return AssignmentExpressions.filter((AssignmentExpression) => {
    const {
      left: { object, property },
    } = AssignmentExpression
    if (!object || !property) {
      return false
    }
    return (
      property.name === 'exports' ||
      (object.name === 'module' && property.name === 'exports')
    )
  })
}

module.exports = findCJSExportsAssignmentsExpressionOnProgramNode
