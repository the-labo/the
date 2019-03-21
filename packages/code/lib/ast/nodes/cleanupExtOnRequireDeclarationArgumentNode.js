/**
 * @memberof module:the-code
 * @function cleanupExtOnRequireDeclarationArgumentNode
 */
'use strict'

const path = require('path')

/** @lends cleanupExtOnRequireDeclarationArgumentNode */
function cleanupExtOnRequireDeclarationArgumentNode(
  ArgumentNode,
  { extToRemove, replace },
) {
  const shouldRemoveExt = extToRemove.test(path.extname(ArgumentNode.value))
  if (shouldRemoveExt) {
    return replace(
      [ArgumentNode.start + 1, ArgumentNode.end - 1],
      ArgumentNode.value.replace(extToRemove, ''),
    )
  }
}

module.exports = cleanupExtOnRequireDeclarationArgumentNode
