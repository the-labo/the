'use strict'
/**
 * Process export statement
 * @memberof module:@the-/code.processors
 * @function processJSExport
 * @param {string} content
 * @returns {string} processed
 */
const applyConverter = require('../helpers/applyConverter')

/** @lends module:@the-/code.processors.processJSExport */
function processJSExport(content, options = {}) {
  return applyConverter(content, (content) => content)
}

module.exports = processJSExport
