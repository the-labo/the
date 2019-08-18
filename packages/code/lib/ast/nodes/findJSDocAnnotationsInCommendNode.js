'use strict'

const { EOL } = require('os')

/**
 * @memberof module:@the-/code.ast.nodes
 * @function findJSDocAnnotationsInCommendNode
 * @param CommentNode
 * @returns {*}
 */
function findJSDocAnnotationsInCommendNode(CommentNode) {
  const annotations = []
  let started = false
  let workingAnnotation = null
  const { value } = CommentNode

  const bodyFor = (annotation) => {
    const {
      end: valueEnd,
      kind: { end: kindEnd },
    } = annotation

    if (kindEnd === valueEnd) {
      return null
    }
    const valueStart = kindEnd + 1
    return {
      end: valueEnd,
      start: valueStart,
      value: String(value).substring(valueStart - offset, valueEnd - offset),
    }
  }

  const kindFor = (start, end) => ({
    end,
    name: String(value).substring(start + 1 - offset, end - offset),
    start,
  })

  const offset = (CommentNode.start || 0) + 2
  let line = 0
  let lineEndAt = -1
  for (let i = 0; i < value.length; i++) {
    const letter = value[i]
    const hitsEmpty = !letter.trim()
    const hitsAtMark = letter === '@'
    const hitsEOL = letter === EOL
    const hitsBracketStart = letter === '{'
    const hitsBracketEnd = letter === '}'

    const newAnnotation = () => ({
      loc: { start: { line } },
      start: offset + i,
    })
    const nextAnnotation = () => {
      workingAnnotation.body = bodyFor(workingAnnotation)
      annotations.push(workingAnnotation)
      return newAnnotation()
    }

    if (hitsEOL) {
      line++
      lineEndAt = i
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
          workingAnnotation.end = lineEndAt + offset
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
      workingAnnotation.kind = kindFor(
        workingAnnotation.start,
        Number(i) + offset,
      )
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
      if (!workingAnnotation.kind) {
        workingAnnotation.kind = kindFor(
          workingAnnotation.start,
          workingAnnotation.end,
        )
      }
      workingAnnotation.body = bodyFor(workingAnnotation)
    }
    annotations.push(workingAnnotation)
  }
  return annotations
    .map((annotation) => ({ ...annotation }))
    .sort((a, b) => a.start - b.start)
}

module.exports = findJSDocAnnotationsInCommendNode
