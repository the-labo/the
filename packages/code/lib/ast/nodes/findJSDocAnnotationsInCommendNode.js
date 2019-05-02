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
      workingAnnotation.value = String(value).substring(
        workingAnnotation.kind.end + 1,
        workingAnnotation.end,
      )
      annotations.push(workingAnnotation)
      workingAnnotation = { start: i }
      continue
    }
    if (hitsEmpty) {
      if (!workingAnnotation.kind) {
        const kindStart = workingAnnotation.start
        const kindEnd = Number(i)
        workingAnnotation.kind = {
          end: kindEnd,
          name: String(value).substring(kindStart + 1, kindEnd),
          start: kindStart,
        }
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
      workingAnnotation.value = String(value).substring(
        workingAnnotation.kind.end + 1,
        workingAnnotation.end,
      )
    }
    annotations.push(workingAnnotation)
  }
  const offset = (CommentNode.start || 0) + 2
  return annotations.map((annotation) => ({
    ...annotation,
    end: offset + annotation.end,
    start: offset + annotation.start,
    kind: annotation.kind && {
      end: offset + annotation.kind.end,
      name: annotation.kind.name,
      start: offset + annotation.kind.start,
    },
  }))
}

module.exports = findJSDocAnnotationsInCommendNode
