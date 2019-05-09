/**
 * @memberof module:@the-/code.processors
 * @function processJSPrettier
 * @param {string} content
 * @returns {Promise<string>} processed
 */
'use strict'

const path = require('path')
const prettier = require('prettier')

/** @lends module:@the-/code.processors.processJSPrettier */
async function processJSPrettier(content, { filename } = {}) {
  const config = filename
    ? await prettier.resolveConfig(path.dirname(filename))
    : {}
  return prettier.format(content, {
    arrowParens: 'always',
    jsxBracketSameLine: false,
    jsxSingleQuote: true,
    parser: 'babel',
    quoteProps: 'as-needed',
    semi: false,
    singleQuote: true,
    trailingComma: 'all',
    ...(config || {}),
  })
}

module.exports = processJSPrettier
