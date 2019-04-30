/**
 * @memberof module:@the-/code.ast.nodes
 * @function replaceJSDocSynonymsOnCommentNode
 */
'use strict'

const findJSDocAnnotationsInCommendNode = require('./findJSDocAnnotationsInCommendNode')

// see http://usejsdoc.org/
const synonyms = {
  arg: 'param',
  argument: 'param',
  const: 'constant',
  constructor: 'class',
  desc: 'description',
  emits: 'fires',
  exception: 'throws',
  extends: 'augments',
  fileoverview: 'file',
  func: 'function',
  host: 'external',
  method: 'function',
  overview: 'file',
  params: 'param',
  prop: 'property',
  return: 'returns',
  var: 'member',
  virtual: 'abstract',
  yield: 'yields',
}

/** @lends module:@the-/code.ast.nodes.replaceJSDocSynonymsOnCommentNode */
function replaceJSDocSynonymsOnCommentNode(CommentNode, { replace }) {
  const annotations = findJSDocAnnotationsInCommendNode(CommentNode)
  for (const annotation of annotations) {
    const { type } = annotation
    const synonym = synonyms[type.name]
    if (synonym) {
      return replace([type.start + 1, type.end], synonym)
    }
    const lowerName = String(type.name).toLocaleLowerCase()
    if (lowerName !== type.name) {
      return replace([type.start + 1, type.end], lowerName)
    }
  }
}

module.exports = replaceJSDocSynonymsOnCommentNode
