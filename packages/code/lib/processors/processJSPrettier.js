'use strict'
/**
 * @memberof module:@the-/code.processors
 * @function processJSPrettier
 * @param {string} content
 * @returns {Promise<string>} processed
 */
const path = require('path')
const prettier = require('prettier')
const { PrettierConfig } = require('@the-/const-code')

/** @lends module:@the-/code.processors.processJSPrettier */
async function processJSPrettier(content, { filename } = {}) {
  const config = filename
    ? await prettier.resolveConfig(path.dirname(filename))
    : {}
  return prettier.format(content, {
    ...PrettierConfig,
    ...(config || {}),
  })
}

module.exports = processJSPrettier
