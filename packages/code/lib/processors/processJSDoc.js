'use strict'
/**
 * @memberof module:@the-/code.processors
 * @function processJSDoc
 * @param {string} content
 * @param {Object} [options={}]
 */
const { parse } = require('@the-/ast')
const {
  commentModuleOnProgramNode,
  normalizeJSDocAnnotationsOnCommentNode,
  sortAnnotationsOnCommentNode,
} = require('../ast/nodes')
const applyConverter = require('../helpers/applyConverter')
const contentAccess = require('../helpers/contentAccess')

/** @lends module:@the-/code.processors.processJSDoc */
async function processJSDoc(content, options = {}) {
  const { filename } = options
  return applyConverter(
    content,
    async (content) => {
      const parsed = parse(content, options)
      const JSDocComments = parsed.comments.filter(
        (CommentNode) => CommentNode.value[0] === '*',
      )

      const { get, replace, swap } = contentAccess(content)

      {
        const converted = await commentModuleOnProgramNode(parsed.program, {
          JSDocComments,
          filename,
          get,
          replace,
        })
        if (converted) {
          return converted
        }

        for (const comment of JSDocComments) {
          const converted =
            (await sortAnnotationsOnCommentNode(comment, { swap })) ||
            (await normalizeJSDocAnnotationsOnCommentNode(comment, {
              get,
              replace,
            }))
          if (converted) {
            return converted
          }
        }
      }
      return content
    },
    { name: 'processJSDoc' },
  )
}

module.exports = processJSDoc
