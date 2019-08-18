'use strict'

const postcss = require('postcss')

/**
 * @memberof module:@the-/code.parsers
 * @function parseCSS
 * @param content
 * @param [options={}]
 * @returns {Promise<*>}
 */
async function parseCSS(content, options = {}) {
  return postcss.parse(content)
}

module.exports = parseCSS
