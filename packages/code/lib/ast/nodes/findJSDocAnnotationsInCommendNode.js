'use strict'

const { EOL } = require('os')

/**
 * @memberof module:@the-/code.ast.nodes
 * @function findJSDocAnnotationsInCommendNode
 */
function findJSDocAnnotationsInCommendNode(CommentNode) {
  const annotations = []
  let started = false
  let workingAnnotation = null
  const { value } = CommentNode

  const bodyFor = (annotation) => {
    const valueStart = annotation.kind.end + 1
    const { end: valueEnd } = annotation
    return {
      end: valueEnd,
      start: valueStart,
      value: String(value).substring(valueStart - offset, valueEnd - offset),
    }
  }

  const offset = (CommentNode.start || 0) + 2
  let line = 0
  for (let i = 0; i < value.length; i++) {
    const letter = value[i]
    const hitsEmpty = !letter.trim()
    const hitsAtMark = letter === '@'
    const hitsEOL = letter === EOL
    const hitsBracketStart = letter === '{'
    const hitsBracketEnd = letter === '}'

    const newAnnotation = () => ({
      start: offset + i,
      loc: { start: { line } },
    })
    const nextAnnotation = () => {
      workingAnnotation.body = bodyFor(workingAnnotation)
      annotations.push(workingAnnotation)
      return newAnnotation()
    }

    if (hitsEOL) {
      line++
    }
    if (!started && hitsEmpty) {
      continue
    }

    started = true

    const annotationStarted = hitsAtMark && /\*\s*$/.test(value.substring(0, i))
    if (annotationStarted) {
      if (workingAnnotation) {
        const lineChanged = workingAnnotation.loc.start.line !== line
        if (lineChanged) {
          workingAnnotation = nextAnnotation()
        }
      } else {
        workingAnnotation = newAnnotation()
      }
    }

    if (!workingAnnotation) {
      continue
    }

    const annotationEnded = annotationStarted && workingAnnotation.end
    if (annotationEnded) {
      workingAnnotation = nextAnnotation()
      continue
    }

    const kindEnded = hitsEmpty && !workingAnnotation.kind
    if (kindEnded) {
      const { start: kindStart } = workingAnnotation
      const kindEnd = Number(i) + offset
      workingAnnotation.kind = {
        end: kindEnd,
        name: String(value).substring(kindStart + 1 - offset, kindEnd - offset),
        start: kindStart,
      }
      continue
    }

    if (hitsEOL) {
      workingAnnotation.end = offset + i
      workingAnnotation.body = bodyFor(workingAnnotation)
      continue
    }

    const typeEnd = workingAnnotation.type && hitsBracketEnd
    if (typeEnd) {
      workingAnnotation.type.end = offset + i + 1
      workingAnnotation.type.value = value.substring(
        workingAnnotation.type.start - offset + 1,
        workingAnnotation.type.end - offset - 1,
      )
    }

    const typeStart = !workingAnnotation.type && hitsBracketStart
    if (typeStart) {
      workingAnnotation.type = { start: offset + i }
    }
  }

  if (workingAnnotation) {
    if (!workingAnnotation.end) {
      workingAnnotation.end = offset + value.length
      workingAnnotation.body = bodyFor(workingAnnotation)
    }
    annotations.push(workingAnnotation)
  }
  return annotations.map((annotation) => ({ ...annotation }))
}

module.exports = findJSDocAnnotationsInCommendNode
