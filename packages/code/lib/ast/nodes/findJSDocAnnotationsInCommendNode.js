/**
 * @memberof module:@the-/code.ast.nodes
 * @function findJSDocAnnotationsInCommendNode
 */
'use strict'

const { EOL } = require('os')

function findJSDocAnnotationsInCommendNode(CommentNode) {
  const annotations = []
  let started = false
  let workingAnnotation = null
  const value = CommentNode.value
  for (let i = 0; i < value.length; i++) {
    const letter = value[i]
    const hitsEmpty = !letter.trim()
    const hitsAtMark = letter === '@'
    const hitsEOL = letter === EOL
    if (!started && hitsEmpty) {
      continue
    }
    started = true

    if (!workingAnnotation) {
      if (hitsAtMark) {
        workingAnnotation = { start: i }
      }
      continue
    }
    const nextStarted = workingAnnotation.end && hitsAtMark
    if (nextStarted) {
      annotations.push(workingAnnotation)
      workingAnnotation = { start: i }
      continue
    }
    if (hitsEmpty) {
      if (!workingAnnotation.type) {
        workingAnnotation.type = String(value).substring(
          workingAnnotation.start + 1,
          i,
        )
        continue
      }
    }
    if (hitsEOL) {
      workingAnnotation.end = i
      continue
    }
  }
  if (workingAnnotation) {
    if (!workingAnnotation.end) {
      workingAnnotation.end = value.length
    }
    annotations.push(workingAnnotation)
  }
  return annotations.map((annotation) => ({
    ...annotation,
    end: CommentNode.start + annotation.end + 2,
    start: CommentNode.start + annotation.start + 2,
  }))
}

module.exports = findJSDocAnnotationsInCommendNode
