/**
 * @memberof module:@the-/code.ast.nodes
 * @function completeJSDocAnnotationsOnCommentNode
 */
'use strict'

const {
  finder,
  constants: { NodeTypes },
} = require('@the-/ast')

/** @lends module:@the-/code.ast.nodes.completeJSDocAnnotationsOnCommentNode */
function completeJSDocAnnotationsOnProgramNode(program, { get, replace }) {
  const FunctionDeclarations = finder.findByTypes(program, [
    NodeTypes.FunctionDeclaration,
  ])
  for (const FunctionDeclaration of FunctionDeclarations) {
    const { leadingComments } = FunctionDeclaration
    const comment =
      leadingComments && leadingComments[leadingComments.length - 1]
    if (!comment) {
      continue
    }
    if (!/^\*/.test(comment.value)) {
      continue
    }
    console.log('program', get([comment.start, comment.end]))
  }
}

module.exports = completeJSDocAnnotationsOnProgramNode
