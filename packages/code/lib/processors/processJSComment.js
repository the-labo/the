'use strict'

const { parse } = require('@the-/ast')
const { spaceOnCommentNode } = require('../ast/nodes')
const applyConverter = require('../helpers/applyConverter')
const contentAccess = require('../helpers/contentAccess')

/**
 * @memberof module:@the-/code.processors
 * @function processComment
 * @param {string} content
 * @returns {string} processed
 */
function processComment(content, options = {}) {
  const { SEPARATOR = ' '.padEnd(36, '-') } = options
  return applyConverter(
    content,
    (content) => {
      const { comments } = parse(content, options)
      const { replace } = contentAccess(content)

      for (const CommentNode of comments) {
        const converted = spaceOnCommentNode(CommentNode, {
          SEPARATOR,
          content,
          replace,
        })
        if (converted) {
          return converted
        }
      }

      return content
    },
    { name: 'processComment' },
  )
}

module.exports = processComment
