/**
 * Process declarations
 * @memberof module:@the-/code.processors
 * @function processJSDeclarations
 */
'use strict'

const {
  constants: { NodeTypes },
  finder,
  parse,
} = require('@the-/ast')
const applyConverter = require('../helpers/applyConverter')
const contentAccess = require('../helpers/contentAccess')
const normalizeVariableDeclaratorOnStatementNode = require('../ast/nodes/normalizeVariableDeclaratorOnStatementNode')

/** @lends module:@the-/code.processors.processJSDeclarations */
function processJSDeclarations(content, options = {}) {
  return applyConverter(content, (content) => {
    const parsed = parse(content, options)
    const { get, replace } = contentAccess(content)

    const Statements = finder.findByTypes(parsed, [
      NodeTypes.Program,
      NodeTypes.BlockStatement,
    ])

    for (const Statement of Statements) {
      const converted = normalizeVariableDeclaratorOnStatementNode(Statement, {get, replace})
      if (converted) {
        return converted
      }
    }
    return content
  })
}

module.exports = processJSDeclarations
