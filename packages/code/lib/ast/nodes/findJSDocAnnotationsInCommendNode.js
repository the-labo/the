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
        workingAnnotation.type.end + 1,
        workingAnnotation.end,
      )
      annotations.push(workingAnnotation)
      workingAnnotation = { start: i }
      continue
    }
    if (hitsEmpty) {
      if (!workingAnnotation.type) {
        const typeStart = workingAnnotation.start
        const typeEnd = Number(i)
        workingAnnotation.type = {
          end: typeEnd,
          name: String(value).substring(typeStart + 1, typeEnd),
          start: typeStart,
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
        workingAnnotation.type.end + 1,
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
    type: annotation.type && {
      end: offset + annotation.type.end,
      name: annotation.type.name,
      start: offset + annotation.type.start,
    },
  }))
}

module.exports = findJSDocAnnotationsInCommendNode
