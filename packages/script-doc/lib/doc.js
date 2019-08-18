'use strict'

const argx = require('argx')
const path = require('path')
const jsdoc = require('@the-/jsdoc')

/**
 * Generate jsdoc
 * @memberof module:@the-/script-doc
 * @function doc
 * @param {string} [dirname=process.cwd()] - Project directory name
 * @param {Object} [options={}] - Optional settings
 * @returns {Promise}
 */
async function doc(dirname = process.cwd(), options = {}) {
  const args = argx(arguments)
  options = args.pop('object') || {}
  dirname = args.shift('string') || process.cwd()

  const { generate } = jsdoc({ prefix: '@the-/script-doc' })
  const {
    jsonFile = 'jsdoc.json',
    mdFile = 'api.md',
    src = ['lib/*.js', 'lib/**/*.js', 'lib/*.jsx', 'lib/**/*.jsx'],
  } = options
  const cwd = process.cwd()
  await generate(dirname, path.resolve(dirname, 'doc/api'), {
    jsonFile,
    mdFile,
    patterns: src,
  })
  process.chdir(cwd)
}

module.exports = doc
