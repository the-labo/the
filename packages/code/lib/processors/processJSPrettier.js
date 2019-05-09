/**
 * @memberof module:@the-/code.processors
 * @function processJSPrettier
 * @param {string} content
 * @returns {Promise<string>} processed
 */
'use strict'

const prettier = require('prettier')


/** @lends module:@the-/code.processors.processJSPrettier */
async function processJSPrettier(content) {
  return prettier.format(content, {
    arrowParens: 'always',
    jsxBracketSameLine: false,
    jsxSingleQuote: true,
    parser: 'babel',
    quoteProps: 'as-needed',
    semi: false,
    singleQuote: true,
    trailingComma: 'all',
  })
}

module.exports = processJSPrettier
