'use strict'

const path = require('path')

const isRelative = (filename) => /^\./.test(filename)

/**
 * @memberof module:@the-/code.ast.nodes
 * @function cleanupExtOnImportDeclarationNode
 */
function cleanupExtOnImportDeclarationNode(
  ImportDeclaration,
  { extToRemove, get, replace },
) {
  const { source } = ImportDeclaration
  if (!isRelative(source.value)) {
    return
  }
  const extname = path.extname(source.value)
  const shouldRemoveExt = extToRemove.includes(extname)
  if (shouldRemoveExt) {
    const range = [source.start, source.end]
    const original = get(range)
    const replacing = original.replace(extname, '')
    if (replacing !== original) {
      return replace(range, replacing)
    }
  }
}

module.exports = cleanupExtOnImportDeclarationNode
