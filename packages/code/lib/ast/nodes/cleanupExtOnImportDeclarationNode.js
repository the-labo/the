'use strict'
/**
 * @memberof module:@the-/code.ast.nodes
 * @function cleanupExtOnImportDeclarationNode
 */
const path = require('path')

const isRelative = (filename) => /^\./.test(filename)

/** @lends module:@the-/code.ast.nodes.cleanupExtOnImportDeclarationNode */
function cleanupExtOnImportDeclarationNode(
  ImportDeclaration,
  { extToRemove, replace },
) {
  const { source } = ImportDeclaration
  if (!isRelative(source.value)) {
    return
  }

  const shouldRemoveExt = extToRemove.test(path.extname(source.value))
  if (shouldRemoveExt) {
    return replace(
      [source.start + 1, source.end - 1],
      source.value.replace(extToRemove, ''),
    )
  }
}

module.exports = cleanupExtOnImportDeclarationNode
