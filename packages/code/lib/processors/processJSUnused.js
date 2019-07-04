'use strict'
/**
 * Removed unused vars
 * @memberof module:@the-/code.processors
 * @function processJSUnused
 * @param {string} content
 * @returns {string} processed
 */
const {
  constants: { NodeTypes },
  finder,
  parse,
} = require('@the-/ast')
const {
  cleanupEmptyArrayPatternParamsOnFunctionNode,
  cleanupEmptyObjectPatternParamsOnFunctionNode,
  cleanupUnusedArgumentsOnFunctionNode,
  cleanupUnusedOnArrayPatternNode,
  cleanupUnusedOnImportNode,
  cleanupUnusedOnObjectPatternNode,
  cleanupUnusedOnVariableNode,
} = require('../ast/nodes')
const applyConverter = require('../helpers/applyConverter')
const applyToNodes = require('../helpers/applyToNodes')
const { byType } = require('../helpers/arrayHelper')
const contentAccess = require('../helpers/contentAccess')

/** @lends module:@the-/code.processors.processJSUnused */
function processJSUnused(content, options = {}) {
  const _consumingIdentifiersFor = (Context) => {
    const asMember = finder
      .findByTypes(Context, [NodeTypes.MemberExpression])
      .filter((exp) => !exp.computed)
      .map((exp) => exp.property)
      .filter((property) => property.type === NodeTypes.Identifier)
    const asPropKey = finder
      .findByTypes(Context, [NodeTypes.ObjectProperty])
      .filter((prop) => !prop.computed)
      .filter((prop) => !prop.shorthand)
      .map((prop) => prop.key)
      .filter((property) => property.type === NodeTypes.Identifier)
    const startsToSkip = new Set([
      ...asMember.map(({ start }) => start),
      ...asPropKey.map(({ start }) => start),
    ])
    return finder
      .findByTypes(Context, [NodeTypes.Identifier, NodeTypes.JSXIdentifier])
      .filter((Identeifier) => !startsToSkip.has(Identeifier.start))
  }

  return applyConverter(
    content,
    (content) => {
      const parsed = parse(content, options)
      const { enclosedRange, get, replace, search } = contentAccess(content)

      {
        const FunctionNodes = finder.findByTypes(parsed, [
          NodeTypes.FunctionDeclaration,
          NodeTypes.FunctionExpression,
          NodeTypes.ArrowFunctionExpression,
          NodeTypes.ObjectMethod,
        ])
        for (const FunctionNode of FunctionNodes) {
          const ConsumingIdentifiers = _consumingIdentifiersFor(FunctionNode)

          const converted =
            cleanupUnusedArgumentsOnFunctionNode(FunctionNode, {
              ConsumingIdentifiers,
              enclosedRange,
              replace,
            }) ||
            cleanupEmptyObjectPatternParamsOnFunctionNode(FunctionNode, {
              replace,
            }) ||
            cleanupEmptyArrayPatternParamsOnFunctionNode(FunctionNode, {
              replace,
            }) ||
            applyToNodes(
              FunctionNode.params.filter(byType('ObjectPattern')),
              (ObjectPattern) =>
                cleanupUnusedOnObjectPatternNode(ObjectPattern, {
                  ConsumingIdentifiers,
                  replace,
                }),
            ) ||
            applyToNodes(
              FunctionNode.params.filter(byType('ArrayPattern')),
              (ArrayPattern) =>
                cleanupUnusedOnArrayPatternNode(ArrayPattern, {
                  ConsumingIdentifiers,
                  replace,
                }),
            )
          if (converted) {
            return converted
          }
        }
      }

      {
        const Contexts = [
          parsed,
          ...finder.findByTypes(parsed, [
            NodeTypes.ClassMethod,
            NodeTypes.FunctionDeclaration,
          ]),
        ]
        for (const Context of Contexts) {
          const ObjectPatterns = finder.findByTypes(Context, [
            NodeTypes.ObjectPattern,
          ])
          const ArrayPatterns = finder.findByTypes(Context, [
            NodeTypes.ArrayPattern,
          ])
          const VariableDeclarations = finder.findByTypes(Context, [
            NodeTypes.VariableDeclaration,
          ])

          const ConsumingIdentifiers = _consumingIdentifiersFor(Context)
          const ImportDeclarations = finder.findByTypes(Context, [
            NodeTypes.Identifier,
            NodeTypes.ImportDeclaration,
          ])

          const converted =
            applyToNodes(ObjectPatterns, (ObjectPattern) =>
              cleanupUnusedOnObjectPatternNode(ObjectPattern, {
                ConsumingIdentifiers,
                replace,
              }),
            ) ||
            applyToNodes(ArrayPatterns, (ArrayPattern) =>
              cleanupUnusedOnArrayPatternNode(ArrayPattern, {
                ConsumingIdentifiers,
                replace,
              }),
            ) ||
            applyToNodes(VariableDeclarations, (VariableDeclaration) =>
              cleanupUnusedOnVariableNode(VariableDeclaration, {
                ConsumingIdentifiers,
                replace,
              }),
            ) ||
            applyToNodes(ImportDeclarations, (ImportDeclaration) =>
              cleanupUnusedOnImportNode(ImportDeclaration, {
                ConsumingIdentifiers,
                get,
                replace,
                search,
              }),
            )
          if (converted) {
            return converted
          }
        }
      }
      return content
    },
    { name: 'processJSUnused' },
  )
}

module.exports = processJSUnused
