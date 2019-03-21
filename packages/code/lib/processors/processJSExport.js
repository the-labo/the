/**
 * Process export statement
 * @memberOf module:the-code/lib/processors
 * @function processJSExport
 * @param {string} content
 * @returns {string} processed
 */
'use strict'

const {
  constants: { NodeTypes },
  finder,
  parse,
} = require('the-ast')
const applyConverter = require('../helpers/applyConverter')

/** @lends processJSExport */
function processJSExport(content, options = {}) {
  return applyConverter(content, (content) => {
    const parsed = parse(content)
    const ExportDeclarations = finder.findByTypes(parsed.program, [
      NodeTypes.ExportDefaultDeclaration,
      NodeTypes.ExportNamedDeclaration,
    ])
    // console.log(ExportDeclarations)
    return content
  })
}

module.exports = processJSExport
