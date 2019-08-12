'use strict'

/**
 * @memberof module:@the-/code.ast.nodes
 * @function cleanupExtOnRequireDeclarationArgumentNode
 */
const path = require('path')

/** @lends module:@the-/code.ast.nodes.cleanupExtOnRequireDeclarationArgumentNode */
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
