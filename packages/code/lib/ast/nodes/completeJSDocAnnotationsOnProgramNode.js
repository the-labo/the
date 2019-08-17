'use strict'

const commentParser = require('comment-parser')
const { EOL } = require('os')
const {
  constants: { NodeTypes },
  finder,
} = require('@the-/ast')

/**
 * @memberof module:@the-/code.ast.nodes
 * @function completeJSDocAnnotationsOnCommentNode
 */
function completeJSDocAnnotationsOnProgramNode(program, { get, replace }) {
  const FunctionDeclarations = finder.findByTypes(program, [
    NodeTypes.FunctionDeclaration,
  ])
  for (const FunctionDeclaration of FunctionDeclarations) {
    const { leadingComments, params } = FunctionDeclaration
    const comment =
      leadingComments && leadingComments[leadingComments.length - 1]
    if (!comment) {
      continue
    }
    if (!/^\*/.test(comment.value)) {
      continue
    }
    const range = [comment.start, comment.end]
    const [commentData] = commentParser(get(range))
    if (!commentData) {
      continue
    }
    const tagsByTypes = commentData.tags.reduce(
      (r, tag) => ({
        ...r,
        [tag.tag]: [].concat(r[tag.tag] || [], tag),
      }),
      {},
    )

    const isClass = ['class', 'constructor'].some((k) =>
      tagsByTypes.hasOwnProperty(k),
    )
    if (isClass) {
      return
    }
    const indent = new Array(comment.loc.start.column).fill(' ').join('')
    const indented = (source) =>
      String(source)
        .split(EOL)
        .map((line) => `${indent} * ${line}`)
        .join(EOL)

    const paramCommentOf = (paramNode) => {
      const isOptional = paramNode.type === NodeTypes.AssignmentPattern
      if (isOptional) {
        const {
          right: { name: defaults },
        } = paramNode
        return `${indent} * @param [${paramNode.left.name}=${defaults}]`
      }
      return `${indent} * @param ${paramNode.name}`
    }

    const addComments = (comments) => {
      const tagsToStrings = (tags) =>
        tags ? tags.map((tag) => indented(String(tag.source))) : []
      const { description: descriptionTags, ...otherTags } = tagsByTypes
      const newCommentCode = [
        '/**',
        commentData.description
          ? `${indent} * ${commentData.description}`
          : null,
        ...tagsToStrings(descriptionTags),
        ...comments,
        ...Object.entries(otherTags).map(([, tags]) =>
          tagsToStrings(tags).join(EOL),
        ),
        `${indent} */`,
      ]
        .filter(Boolean)
        .join(EOL)
      if (newCommentCode !== get(range)) {
        return replace(range, newCommentCode)
      }
    }

    const needsParams = params.length > 0 && !tagsByTypes.param
    if (needsParams) {
      return addComments(params.map((paramNode) => paramCommentOf(paramNode)))
    }

    const Returns = finder.findByTypes(FunctionDeclaration, [
      NodeTypes.ReturnStatement,
    ])
    const needsReturn =
      Returns.length > 0 && !(tagsByTypes.return || tagsByTypes.returns)
    if (needsReturn) {
      return addComments([`* ${indent} @returns {*} `])
    }
  }
}

module.exports = completeJSDocAnnotationsOnProgramNode
