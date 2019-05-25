'use strict'
/**
 * @memberof module:@the-/code.processors
 * @function processFileEnd
 * @param {string} content
 * @returns {string} processed
 */
const { EOL } = require('os')

/** @lends module:@the-/code.processors.processFileEnd */
function processFileEnd(content) {
  const endsWithEOL =
    content.substr(content.length - EOL.length, EOL.length) === EOL
  if (!endsWithEOL) {
    content += EOL
  }
  return content.replace(/\s*\s$/, EOL)
}

module.exports = processFileEnd
