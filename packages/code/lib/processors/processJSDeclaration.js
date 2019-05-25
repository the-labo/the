/**
 * Process declarations
 * @memberof module:@the-/code.processors
 * @function processJSDeclaration
 */
'use strict'

const {
  constants: { NodeTypes },
  finder,
  parse,
} = require('@the-/ast')
const normalizeVariableDeclaratorOnStatementNode = require('../ast/nodes/normalizeVariableDeclaratorOnStatementNode')
const applyConverter = require('../helpers/applyConverter')
const contentAccess = require('../helpers/contentAccess')

/** @lends module:@the-/code.processors.processJSDeclaration */
function processJSDeclaration(content, options = {}) {
  return applyConverter(content, (content) => {
    const parsed = parse(content, options)
    const { get, replace } = contentAccess(content)

    const Statements = finder.findByTypes(parsed, [
      NodeTypes.Program,
      NodeTypes.BlockStatement,
    ])

    for (const Statement of Statements) {
      const converted = normalizeVariableDeclaratorOnStatementNode(Statement, {
        get,
        replace,
      })
      if (converted) {
        return converted
      }
    }
    return content
  })
}

module.exports = processJSDeclaration
