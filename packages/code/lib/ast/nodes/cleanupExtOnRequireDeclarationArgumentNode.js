'use strict'

const path = require('path')

/**
 * @memberof module:@the-/code.ast.nodes
 * @function cleanupExtOnRequireDeclarationArgumentNode
 */
function cleanupExtOnRequireDeclarationArgumentNode(
  ArgumentNode,
  { extToRemove, get, replace },
) {
  const extname = path.extname(ArgumentNode.value)
  const shouldRemoveExt = extToRemove.includes(extname)
  if (shouldRemoveExt) {
    const range = [ArgumentNode.start, ArgumentNode.end]
    const original = get(range)
    const replacing = original.replace(extname, '')
    if (replacing !== original) {
      return replace(range, replacing)
    }
  }
}

module.exports = cleanupExtOnRequireDeclarationArgumentNode
