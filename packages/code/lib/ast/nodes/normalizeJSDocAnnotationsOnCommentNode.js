/**
 * @memberof module:@the-/code.ast.nodes
 * @function normalizeJSDocAnnotationsOnCommentNode
 */
'use strict'

const findJSDocAnnotationsInCommendNode = require('./findJSDocAnnotationsInCommendNode')

// see http://usejsdoc.org/
const kindsMap = {
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

const typesMap = {
  Boolean: 'boolean',
  Number: 'number',
  String: 'string',
  Void: 'undefined',
  function: 'function()',
  void: 'undefined',
}

/** @lends module:@the-/code.ast.nodes.normalizeJSDocAnnotationsOnCommentNode */
function normalizeJSDocAnnotationsOnCommentNode(CommentNode, { replace }) {
  const annotations = findJSDocAnnotationsInCommendNode(CommentNode)
  for (const annotation of annotations) {
    const { kind, type } = annotation
    const synonym = kindsMap[kind.name]
    if (synonym) {
      return replace([kind.start + 1, kind.end], synonym)
    }
    const lowerName = String(kind.name).toLocaleLowerCase()
    if (lowerName !== kind.name) {
      return replace([kind.start + 1, kind.end], lowerName)
    }
    if (type) {
      if (/\.</.test(type.value)) {
        return replace(
          [type.start + 1, type.end - 1],
          type.value.replace('.<', '<'),
        )
      }
      const subTypeMatch = type.value.match(/(.*<)(.*)(>.*)/)
      if (subTypeMatch) {
        const [, before, subType, after] = subTypeMatch
        const normalizedSubType = typesMap[subType]
        if (normalizedSubType) {
          return replace(
            [type.start + 1, type.end - 1],
            [before, normalizedSubType, after].join(''),
          )
        }
      }
      const normalizedType = typesMap[type.value]
      if (normalizedType) {
        return replace([type.start + 1, type.end - 1], normalizedType)
      }
    }
  }
}

module.exports = normalizeJSDocAnnotationsOnCommentNode
