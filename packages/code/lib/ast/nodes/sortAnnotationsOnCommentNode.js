/**
 * @memberof module:@the-/code.ast.nodes
 * @function sortAnnotationsOnCommentNode
 */
'use strict'

const findJSDocAnnotationsInCommendNode = require('./findJSDocAnnotationsInCommendNode')

/** @lends module:@the-/code.ast.nodes.sortAnnotationsOnCommentNode */
function sortAnnotationsOnCommentNode(CommentNode, { swap }) {
  const annotations = findJSDocAnnotationsInCommendNode(CommentNode)
  const _weightAnnotation = (annotation) => {
    let weight = 0
    const typeName = String(annotation.type.name).toLocaleLowerCase()
    switch (typeName) {
      case 'augments':
      case 'extends':
        weight -= 20
        break
      case 'class':
        weight -= 30
        break
      case 'example':
        weight += 100
        break
      case 'function':
        weight -= 30
        break
      case 'memberOf':
      case 'memberof': {
        weight -= 100
        break
      }
      case 'return':
      case 'returns': {
        weight += 10
        break
      }
      default:
        break
    }
    return weight
  }
  const sortedAnnotations = [...annotations].sort((a, b) => {
    const aWeight = _weightAnnotation(a)
    const bWeight = _weightAnnotation(b)
    if (aWeight !== bWeight) {
      return aWeight - bWeight
    }
    return a.type.name.localeCompare(b.type.name)
  })
  const rangeFor = (annotation) => [annotation.start, annotation.end]
  for (let i = 0; i < annotations.length; i++) {
    const annotation = annotations[i]
    const sorted = sortedAnnotations[i]
    if (annotation.start !== sorted.start) {
      return swap(rangeFor(sorted), rangeFor(annotation))
    }
  }
}

module.exports = sortAnnotationsOnCommentNode
