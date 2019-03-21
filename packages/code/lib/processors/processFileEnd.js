/**
 * @memberOf module:the-code/lib/processors
 * @function processFileEnd
 * @param {string} content
 * @returns {string} processed
 */
'use strict'

const { EOL } = require('os')

/** @lends processFileEnd */
function processFileEnd(content) {
  const endsWithEOL =
    content.substr(content.length - EOL.length, EOL.length) === EOL
  if (!endsWithEOL) {
    content += EOL
  }
  return content.replace(/\s*\s$/, EOL)
}

module.exports = processFileEnd
