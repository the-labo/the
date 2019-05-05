/**
 * @memberof module:@the-/code.parsers
 * @function parseCSS
 */
'use strict'

const postcss = require('postcss')

/** @lends module:@the-/code.parsers.parseCSS */
async function parseCSS(content, options = {}) {
  return postcss.parse(content)
}

module.exports = parseCSS
