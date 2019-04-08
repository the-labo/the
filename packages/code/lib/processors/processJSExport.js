/**
 * Process export statement
 * @memberOf module:the-code/lib/processors
 * @function processJSExport
 * @param {string} content
 * @returns {string} processed
 */
'use strict'

const applyConverter = require('../helpers/applyConverter')

/** @lends processJSExport */
function processJSExport(content, options = {}) {
  return applyConverter(content, (content) => {
    return content
  })
}

module.exports = processJSExport
