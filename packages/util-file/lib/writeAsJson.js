/**
 * @memberOf module:@the-/util-file
 * @function writeAsJsonSync
 * @param {string} filename
 * @param {Object} data
 * @returns {Promise}
 */
'use strict'

const { mkdirpAsync, writeFileAsync } = require('asfs')
const JSON5 = require('json5')
const { EOL } = require('os')
const path = require('path')
const sortProperties = require('./helpers/sortProperties')
const isJSON5File = require('./isJSON5File')

/** @lends module:@the-/util-file.writeAsJsonSync */
async function writeAsJsonSync(filename, data) {
  await mkdirpAsync(path.dirname(filename))
  data = sortProperties(data)
  const isJSON5 = isJSON5File(filename)
  const content = isJSON5
    ? JSON5.stringify(data, null, 2) + EOL
    : JSON.stringify(data, null, 2) + EOL
  await writeFileAsync(filename, content)
}

module.exports = writeAsJsonSync
