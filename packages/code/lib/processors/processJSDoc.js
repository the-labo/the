'use strict'

const { parse } = require('@the-/ast')
const {
  commentModuleOnProgramNode,
  completeJSDocAnnotationsOnProgramNode,
  formatJSDocCommentOnCommentNode,
  normalizeJSDocAnnotationsOnCommentNode,
  sortAnnotationsOnCommentNode,
} = require('../ast/nodes')
const applyConverter = require('../helpers/applyConverter')
const contentAccess = require('../helpers/contentAccess')

/**
 * @memberof module:@the-/code.processors
 * @function processJSDoc
 * @param {Object} [options={}]
 * @param {string} content
 * @returns {Promise<*>}
 */
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
        const converted =
          (await commentModuleOnProgramNode(parsed.program, {
            JSDocComments,
            filename,
            get,
            replace,
          })) ||
          (await completeJSDocAnnotationsOnProgramNode(parsed.program, {
            JSDocComments,
            get,
            replace,
          }))
        if (converted) {
          return converted
        }

        for (const comment of JSDocComments) {
          const converted =
            (await sortAnnotationsOnCommentNode(comment, { swap })) ||
            (await normalizeJSDocAnnotationsOnCommentNode(comment, {
              get,
              replace,
            })) ||
            (await formatJSDocCommentOnCommentNode(comment, { get, replace }))
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
