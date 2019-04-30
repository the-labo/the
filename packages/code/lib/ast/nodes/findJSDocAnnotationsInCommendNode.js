/**
 * @memberof module:@the-/code.ast.nodes
 * @function findJSDocAnnotationsInCommendNode
 */
'use strict'

const { EOL } = require('os')

function findJSDocAnnotationsInCommendNode(CommentNode) {
  const LINE_PREFIX = /^\s?\*/
  const lines = CommentNode.value
    .split(EOL)
    .map((line) => line.replace(LINE_PREFIX, ''))
    .filter(Boolean)

  const annotations = []
  for (const line of lines) {
    const isAnnotation = /^\s?@/.test(line)
    if (isAnnotation) {
      const [, type, , value] = line.match(/^\s?@([^\s]*)(\s?)(.*)/)
      annotations.push({ type, value })
    } else {
      const annotation = annotations.pop()
      if (annotation) {
        annotations.push({
          ...annotation,
          value: [annotation.value, line.replace(LINE_PREFIX, '')].join(EOL),
        })
      }
    }
  }
  return annotations
}

module.exports = findJSDocAnnotationsInCommendNode
