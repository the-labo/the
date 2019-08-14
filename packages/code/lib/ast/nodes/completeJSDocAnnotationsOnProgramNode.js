'use strict'
// /**
//  * @memberof module:@the-/code.ast.nodes
//  * @function completeJSDocAnnotationsOnCommentNode
//  */
// 'use strict'
//
// const commentParser = require('comment-parser')
// const { EOL } = require('os')
// const {
//   constants: { NodeTypes },
//   finder,
// } = require('@the-/ast')
//
// /** @lends module:@the-/code.ast.nodes.completeJSDocAnnotationsOnCommentNode */
// function completeJSDocAnnotationsOnProgramNode(program, { get, replace }) {
//   const FunctionDeclarations = finder.findByTypes(program, [
//     NodeTypes.FunctionDeclaration,
//   ])
//   for (const FunctionDeclaration of FunctionDeclarations) {
//     const { leadingComments, params } = FunctionDeclaration
//     const comment =
//       leadingComments && leadingComments[leadingComments.length - 1]
//     if (!comment) {
//       continue
//     }
//     if (!/^\*/.test(comment.value)) {
//       continue
//     }
//     const range = [comment.start, comment.end]
//     const [commentData] = commentParser(get(range))
//     if (!commentData) {
//       continue
//     }
//     const tagsByTypes = commentData.tags.reduce(
//       (r, tag) => ({
//         ...r,
//         [tag.tag]: [].concat(r[tag.tag] || [], tag),
//       }),
//       {},
//     )
//     const indent = new Array(comment.loc.start.column).fill(' ').join('')
//     const paramsData = params.map((param) => ({
//       name: param.name,
//     }))
//     const indented = (source) =>
//       String(source)
//         .split(EOL)
//         .map((line) => `${indent} * ${line}`)
//         .join(EOL)
//     const paramCommentOf = (paramNode, tag) => {
//       const isOptional = paramNode.type === NodeTypes.AssignmentPattern
//       if (!tag) {
//         if (isOptional) {
//           const {
//             right: { name: defaults },
//           } = paramNode
//           return `${indent} * @param [${paramNode.left.name}=${defaults}]`
//         }
//         return `${indent} * @param ${paramNode.name}`
//       }
//       const { name = tag.name } = paramNode
//       const nameDeclaration =
//         isOptional || tag.optional
//           ? `[${[name, tag.default].filter(Boolean).join('=')}]`
//           : name
//       return `${indent} * @param {${tag.type}} ${nameDeclaration} ${tag.description}`
//     }
//
//     const needsReplace =
//       paramsData.length !== (tagsByTypes.param || []).length &&
//       !tagsByTypes.lends
//     if (needsReplace) {
//       const newCommentCode = [
//         `${indent}/**`,
//         Object.entries(tagsByTypes)
//           .map(([type, tags]) => {
//             if (type === 'param') {
//               return params
//                 .map((paramNode, i) => {
//                   const paramTag = tagsByTypes.param[i]
//                   return paramCommentOf(paramNode, paramTag)
//                 })
//                 .join(EOL)
//             }
//             return tags.map((tag) => indented(String(tag.source))).join(EOL)
//           })
//           .join(EOL),
//         `${indent} */`,
//       ]
//         .filter(Boolean)
//         .join(EOL)
//       if (newCommentCode !== get(range)) {
//         return replace(range, newCommentCode)
//       }
//     }
//   }
// }
//
// module.exports = completeJSDocAnnotationsOnProgramNode

module.exports = () => void 0
