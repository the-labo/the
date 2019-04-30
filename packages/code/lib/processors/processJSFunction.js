/**
 * Process function expressions
 * @memberof module:@the-/code.processors
 * @function processJSFunction
 * @param {string} content
 * @returns {string} processed
 */
'use strict'

const {
  constants: { NodeTypes },
  finder,
  parse,
} = require('@the-/ast')
const { cleanupReturnAwaitOnFunctionNode } = require('../ast/nodes')
const applyConverter = require('../helpers/applyConverter')
const applyToNodes = require('../helpers/applyToNodes')
const contentAccess = require('../helpers/contentAccess')

/** @lends module:@the-/code.processors.processJSFunction */
function processJSFunction(content, options = {}) {
  return applyConverter(content, (content) => {
    const parsed = parse(content, options)
    const { get, replace } = contentAccess(content)

    function convertFunctionNode(FunctionNode) {
      return cleanupReturnAwaitOnFunctionNode(FunctionNode, { get, replace })
    }

    const Functions = finder.findByTypes(parsed, [
      NodeTypes.FunctionDeclaration,
      NodeTypes.FunctionExpression,
      NodeTypes.ArrowFunctionExpression,
      NodeTypes.ClassMethod,
      NodeTypes.ClassPrivateMethod,
    ])
    const converted = applyToNodes(Functions, convertFunctionNode)
    if (converted) {
      return converted
    }
    return content
  })
}

module.exports = processJSFunction
