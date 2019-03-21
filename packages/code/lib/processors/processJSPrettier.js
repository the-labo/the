/**
 * @memberOf module:the-code/lib/processors
 * @function processJSPrettier
 * @param {string} content
 * @returns {Promise.<string>} processed
 */
'use strict'

const prettier = require('prettier')

/** @lends processJSPrettier */
async function processJSPrettier(content) {
  return prettier.format(content, {
    arrowParens: 'always',
    jsxBracketSameLine: false,
    jsxSingleQuote: true,
    parser: 'babel',
    semi: false,
    singleQuote: true,
    trailingComma: 'all',
  })
}

module.exports = processJSPrettier
