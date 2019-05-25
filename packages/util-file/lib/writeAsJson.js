'use strict'
/**
 * @memberof module:@the-/util-file
 * @function writeAsJson
 * @param {string} filename
 * @param {Object} data
 * @param {Object} [options]
 * @param {boolean} [options.sort=true]
 * @returns {Promise}
 */
const { mkdirpAsync, writeFileAsync } = require('asfs')
const { sortProperties } = require('fmtjson')
const JSON5 = require('json5')
const { EOL } = require('os')
const path = require('path')
const isJSON5File = require('./isJSON5File')

/** @lends module:@the-/util-file.writeAsJson */
async function writeAsJson(filename, data, options = {}) {
  await mkdirpAsync(path.dirname(filename))
  const { sort = true } = options
  if (sort) {
    data = sortProperties(data)
  }
  const isJSON5 = isJSON5File(filename)
  const content = isJSON5
    ? JSON5.stringify(data, null, 2) + EOL
    : JSON.stringify(data, null, 2) + EOL
  await writeFileAsync(filename, content)
}

module.exports = writeAsJson
