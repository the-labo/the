/**
 * @memberof module:@the-/code.ast.nodes
 * @function normalizeJSDocSynonymsOnCommentNode
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

/** @lends module:@the-/code.ast.nodes.normalizeJSDocSynonymsOnCommentNode */
function normalizeJSDocSynonymsOnCommentNode(CommentNode, { replace }) {
  const annotations = findJSDocAnnotationsInCommendNode(CommentNode)
  for (const annotation of annotations) {
    const { kind } = annotation
    const synonym = synonyms[kind.name]
    if (synonym) {
      return replace([kind.start + 1, kind.end], synonym)
    }
    const lowerName = String(kind.name).toLocaleLowerCase()
    if (lowerName !== kind.name) {
      return replace([kind.start + 1, kind.end], lowerName)
    }
  }
}

module.exports = normalizeJSDocSynonymsOnCommentNode
