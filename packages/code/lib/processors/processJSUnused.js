/**
 * Removed unused vars
 * @memberof module:@the-/code.processors
 * @function processJSUnused
 * @param {string} content
 * @returns {string} processed
 */
'use strict'

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
  return applyConverter(content, (content) => {
    const parsed = parse(content, options)
    const { enclosedRange, get, replace } = contentAccess(content)

    {
      const FunctionNodes = finder.findByTypes(parsed, [
        NodeTypes.FunctionDeclaration,
        NodeTypes.FunctionExpression,
        NodeTypes.ArrowFunctionExpression,
        NodeTypes.ObjectMethod,
      ])
      for (const FunctionNode of FunctionNodes) {
        const ConsumingIdentifiers = finder.findByTypes(FunctionNode, [
          NodeTypes.Identifier,
          NodeTypes.JSXIdentifier,
        ])

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
        const ConsumingIdentifiers = finder.findByTypes(Context, [
          NodeTypes.Identifier,
          NodeTypes.JSXIdentifier,
        ])
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
            }),
          )
        if (converted) {
          return converted
        }
      }
    }
    return content
  })
}

module.exports = processJSUnused
