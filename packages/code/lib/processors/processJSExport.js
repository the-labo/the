'use strict'
/**
 * Process export statement
 * @memberof module:@the-/code.processors
 * @function processJSExport
 * @param {string} content
 * @returns {string} processed
 */
const { parse } = require('@the-/ast')
const sortExportNamedDeclarationsOnProgramNode = require('../ast/nodes/sortExportNamedDeclarationsOnProgramNode')
const applyConverter = require('../helpers/applyConverter')
const contentAccess = require('../helpers/contentAccess')

/** @lends module:@the-/code.processors.processJSExport */
function processJSExport(content, options = {}) {
  return applyConverter(content, (content) => {
    const { swap } = contentAccess(content)
    const parsed = parse(content, options)
    const converted = sortExportNamedDeclarationsOnProgramNode(parsed.program, {
      swap,
    })
    if (converted) {
      return converted
    }
    return content
  })
}

module.exports = processJSExport
