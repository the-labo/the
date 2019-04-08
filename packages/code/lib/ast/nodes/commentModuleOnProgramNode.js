/**
 * @memberof module:the-code
 * @function commentModuleOnProgramNode
 */
'use strict'

const path = require('path')
const {
  constants: { NodeTypes },
  finder,
} = require('@the-/ast')
const { findupDir } = require('@the-/util-path')
const findCJSExportsAssignmentsExpressionOnProgramNode = require('./findCJSExportsAssignmentsExpressionOnProgramNode')
const findJSDocAnnotationsInCommendNode = require('./findJSDocAnnotationsInCommendNode')
const debug = require('debug')('the:code:commentModuleOnProgramNode')

async function commentModuleOnProgramNode(
  ProgramNode,
  { JSDocComments, filename },
) {
  const InterpreterDirectives = finder.findByTypes(ProgramNode.interpreter, [
    'InterpreterDirective',
  ])
  if (InterpreterDirectives.length > 0) {
    // bin script, not a module
    return
  }

  if (!filename) {
    return
  }

  const CJSExportsAssignmentNodes = findCJSExportsAssignmentsExpressionOnProgramNode(
    ProgramNode,
  )
  const ExportDeclarations = finder.findByTypes(ProgramNode, [
    NodeTypes.ExportDefaultDeclaration,
    NodeTypes.ExportNamedDeclaration,
  ])
  if (!ExportDeclarations || !CJSExportsAssignmentNodes) {
    return
  }

  const moduleAnnotationComment = JSDocComments.find((CommentNode) =>
    findJSDocAnnotationsInCommendNode(CommentNode).some(
      (annotaion) => annotaion.type === 'module',
    ),
  )
  const dirname = path.dirname(filename)
  if (!dirname) {
    return
  }
  const pkgDir = await findupDir(dirname, {
    contains: ['package.json'],
  })
  if (!pkgDir) {
    return
  }
  const pkg = require(path.join(pkgDir, 'package.json'))
  const modulePath = path.join(
    ...[
      path.relative(pkgDir, dirname),
      path.basename(filename, path.extname(filename)),
    ].filter(Boolean),
  )
  if (!modulePath) {
    return
  }
  if (!pkg.name) {
    return
  }
  const moduleId = path.join(pkg.name, modulePath)
  debug('moduleId', moduleId)
  if (moduleAnnotationComment) {
    // const { end, start } = moduleAnnotationComment
    // const replacing = `/** @module ${moduleId} */`
    // const got = get([start, end])
    // if (replacing === got) {
    //   return
    // }
    // return replace(
    //   [moduleAnnotationComment.start, moduleAnnotationComment.end],
    //   `/** @module ${moduleId} */`,
    // )
    // TODO
    // return
  } else {
    // TODO
    // return replace([0, 0], `/** @module ${moduleId} */` + EOL)
  }
}

module.exports = commentModuleOnProgramNode
