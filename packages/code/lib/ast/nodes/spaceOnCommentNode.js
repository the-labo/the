/**
 * @memberOf module:the-code
 * @function spaceOnCommentNode
 */
'use strict'

const { EOL } = require('os')

/** @lends spaceOnCommentNode */
function spaceOnCommentNode(CommentNode, options = {}) {
  const { SEPARATOR, content, replace } = options

  function _removeNextBlankLine(comment) {
    const start = comment.end + 1
    const nextBlankLine = content.substr(start).match(/^(\s*\r?\n)/)
    if (nextBlankLine) {
      return replace([start, start + nextBlankLine[1].length], '')
    }
  }

  switch (CommentNode.type) {
    case 'CommentBlock': {
      const converted = _removeNextBlankLine(CommentNode)
      if (converted) {
        return converted
      }
      break
    }
    case 'CommentLine': {
      const isSeparator = /^\s*-{4,}\s*$/.test(CommentNode.value)
      if (isSeparator) {
        if (CommentNode.value !== SEPARATOR) {
          return replace([CommentNode.start + 2, CommentNode.end], SEPARATOR)
        }
        {
          const { column, line } = CommentNode.loc.start
          const before = content.split(EOL)[line - 2]
          const needsSpace = !/^\s*\/\/|^\s*$/.test(before)
          if (needsSpace) {
            return replace(
              [CommentNode.start - column, CommentNode.start - column],
              EOL,
            )
          }
        }
        {
          const converted = _removeNextBlankLine(CommentNode)
          if (converted) {
            return converted
          }
        }
      }
      break
    }
  }
}

module.exports = spaceOnCommentNode
