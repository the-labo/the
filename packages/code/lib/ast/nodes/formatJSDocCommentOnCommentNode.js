'use strict'

const { EOL } = require('os')
const findJSDocAnnotationsInCommendNode = require('./findJSDocAnnotationsInCommendNode')

/**
 * @memberof module:@the-/code.ast.nodes
 * @function formatJSDocCommentOnCommentNode
 * @returns {*}
 */
function formatJSDocCommentOnCommentNode(CommentNode, { get, replace }) {
  const annotations = findJSDocAnnotationsInCommendNode(CommentNode)
  const hasExample = annotations.some(
    (a) => a.kind && a.kind.name === 'example',
  )
  if (hasExample) {
    // TODO Handle example
    return
  }

  const range = [CommentNode.start, CommentNode.end]
  const src = get(range)
  const lines = src.split(EOL)
  const filtered = lines.filter((line) => !/^[ *]*$/.test(line))
  const changed = lines.length !== filtered.length
  if (changed) {
    return replace(range, filtered.join(EOL))
  }
}

module.exports = formatJSDocCommentOnCommentNode
