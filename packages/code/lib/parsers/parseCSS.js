/**
 * @memberOf module:@the-/code/lib/parsers
 * @function parseCSS
 */
'use strict'

const postcss = require('postcss')

/** @lends parseCSS */
async function parseCSS(content, options = {}) {
  return postcss.parse(content)
}

module.exports = parseCSS
