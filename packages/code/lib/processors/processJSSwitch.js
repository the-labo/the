/**
 * Process js switch statement
 * @memberOf module:@the-/code.processors
 * @function processJSSwitch
 * @param {string} content
 * @returns {string} processed
 */
'use strict'

const {
  constants: { NodeTypes },
  finder,
  parse,
} = require('@the-/ast')
const { sortCasesOnSwitchStatementNode } = require('../ast/nodes')
const applyConverter = require('../helpers/applyConverter')
const applyToNodes = require('../helpers/applyToNodes')
const contentAccess = require('../helpers/contentAccess')

/** @lends module:@the-/code.processors.processJSSwitch */
function processJSSwitch(content, options = {}) {
  return applyConverter(content, (content) => {
    const { swap } = contentAccess(content)
    const parsed = parse(content, options)
    const SwitchStatements = finder.findByTypes(parsed, [
      NodeTypes.SwitchStatement,
    ])
    const converted = applyToNodes(SwitchStatements, (SwitchCase) =>
      sortCasesOnSwitchStatementNode(SwitchCase, { swap }),
    )
    if (converted) {
      return converted
    }
    return content
  })
}

module.exports = processJSSwitch
