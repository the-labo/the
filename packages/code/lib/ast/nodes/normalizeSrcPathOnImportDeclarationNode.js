'use strict'

/**
 * @memberof module:@the-/code.ast.nodes
 * @function normalizeSrcPathOnImportDeclarationNode
 */
const path = require('path')

const isRelative = (filename) => /^\./.test(filename)

/** @lends module:@the-/code.ast.nodes.normalizeSrcPathOnImportDeclarationNode */
function normalizeSrcPathOnImportDeclarationNode(
  ImportDeclaration,
  { dirname, replace },
) {
  if (!dirname) {
    return
  }

  const { source } = ImportDeclaration
  if (!isRelative(source.value)) {
    return
  }

  const resolved = path.resolve(dirname, source.value)
  const normalized = path.relative(dirname, resolved)
  if (normalized !== source.value) {
    const replacing = isRelative(normalized) ? normalized : `./${normalized}`
    if (replacing !== source.value) {
      return replace([source.start + 1, source.end - 1], replacing)
    }
  }
}

module.exports = normalizeSrcPathOnImportDeclarationNode
