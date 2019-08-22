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
 * @returns {*}
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

    const shouldSkip = ['class', 'constructor', 'file', 'module', 'lends'].some(
      (k) => tagsByTypes.hasOwnProperty(k),
    )
    if (shouldSkip) {
      return
    }

    const indent = new Array(comment.loc.start.column).fill(' ').join('')
    const indented = (source) =>
      String(source)
        .split(EOL)
        .map((line) => `${indent} * ${line}`)
        .join(EOL)

    const paramDefaultCodeFor = (paramNode) => {
      const { right } = paramNode
      switch (right.type) {
        case NodeTypes.ArrayExpression:
          return '[]'
        case NodeTypes.Identifier:
          return right.name
        case NodeTypes.ObjectExpression:
          return '{}'
        default:
          return ''
      }
    }

    const paramNameFor = (paramNode) => {
      switch (paramNode.type) {
        case NodeTypes.AssignmentPattern: {
          const { left } = paramNode
          switch (left.type) {
            case NodeTypes.ArrayPattern:
              return '[]'
            case NodeTypes.Identifier:
              return left.name
            case NodeTypes.ObjectPattern:
              return '{}'
            default:
              return ''
          }
        }
        case NodeTypes.Identifier:
        default:
          return paramNode.name
      }
    }

    const paramCommentOf = (paramNode) => {
      const name = paramNameFor(paramNode)
      const isOptional = paramNode.type === NodeTypes.AssignmentPattern
      if (isOptional) {
        const defaults = paramDefaultCodeFor(paramNode)
        const expression = defaults ? [name, defaults].join('=') : name
        return `${indent} * @param [${expression || ''}]`
      }

      return `${indent} * @param ${name}`
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

    const needsParams =
      params.length > 0 &&
      !tagsByTypes.param &&
      params.every((param) =>
        [NodeTypes.AssignmentPattern, NodeTypes.Identifier].includes(
          param.type,
        ),
      )
    if (needsParams) {
      return addComments(
        params.map((paramNode, i) => paramCommentOf(paramNode, i)),
      )
    }

    const Returns = finder.findByTypes(FunctionDeclaration, [
      NodeTypes.ReturnStatement,
    ])
    const needsReturn =
      Returns.length > 0 && !(tagsByTypes.return || tagsByTypes.returns)
    if (needsReturn) {
      const type = FunctionDeclaration.async ? 'Promise<*>' : '*'
      return addComments([`${indent} * @returns {${type}} `])
    }
  }
}

module.exports = completeJSDocAnnotationsOnProgramNode
