'use strict'

const findJSDocAnnotationsInCommendNode = require('./findJSDocAnnotationsInCommendNode')

/**
 * @memberof module:@the-/code.ast.nodes
 * @function sortAnnotationsOnCommentNode
 * @returns {*}
 */
function sortAnnotationsOnCommentNode(CommentNode, { swap }) {
  const annotations = findJSDocAnnotationsInCommendNode(CommentNode)
  const _weightAnnotation = (annotation) => {
    let weight = 0
    const kindName = String(annotation.kind.name).toLocaleLowerCase()
    switch (kindName) {
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
      case 'property': {
        weight += 10
        break
      }
      case 'return':
      case 'returns': {
        weight += 50
        break
      }
      case 'typedef': {
        weight -= 50
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

    if (a.kind.name !== b.kind.name) {
      return a.kind.name.localeCompare(b.kind.name)
    }

    return 0
  })
  const rangeFor = (annotation) => [annotation.start, annotation.end]
  for (let i = annotations.length - 1; i >= 0; i--) {
    const annotation = annotations[i]
    const sorted = sortedAnnotations[i]
    if (annotation.start === sorted.start) {
      continue
    }
    if (sorted.kind.name === annotation.kind.name) {
      continue
    }
    const sortedIndex = annotations.findIndex((a) => sorted.start === a.start)
    if (sortedIndex < i) {
      const hasFormer = annotations
        .slice(sortedIndex, i - 1)
        .some((a) => a.kind.name === annotation.kind.name)
      if (hasFormer) {
        continue
      }
    }
    return swap(rangeFor(sorted), rangeFor(annotation))
  }
}

module.exports = sortAnnotationsOnCommentNode
