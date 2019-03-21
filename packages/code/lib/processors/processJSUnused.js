/**
 * Removed unused vars
 * @memberOf module:the-code/lib/processors
 * @function processJSUnused
 * @param {string} content
 * @returns {string} processed
 */
'use strict'

const {
  constants: { NodeTypes },
  finder,
  parse,
  walk,
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

/** @lends processJSUnused */
function processJSUnused(content, options = {}) {
  return applyConverter(content, (content) => {
    const parsed = parse(content, options)
    const { enclosedRange, get, replace } = contentAccess(content)

    const ObjectPatterns = []
    const ArrayPatterns = []
    const VariableDeclarations = []
    const ConsumingIdentifiers = []
    const ImportDeclarations = []
    walk.ancestor(parsed, {
      ArrayPattern: (node) => ArrayPatterns.push(node),
      Identifier: (node) => {
        ConsumingIdentifiers.push(node)
      },
      ImportDeclaration: (node) => ImportDeclarations.push(node),
      JSXIdentifier: (node) => ConsumingIdentifiers.push(node),
      ObjectPattern: (node) => ObjectPatterns.push(node),
      VariableDeclaration: (node) => VariableDeclarations.push(node),
    })

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
    return content
  })
}

module.exports = processJSUnused
