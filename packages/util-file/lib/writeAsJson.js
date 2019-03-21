/**
 * @function writeAsJsonSync
 * @param {string} filename
 * @param {Object} data
 * @returns {Promise}
 */
'use strict'

const { mkdirpAsync, writeFileAsync } = require('asfs')
const JSON5 = require('json5')
const path = require('path')
const sortProperties = require('./helpers/sortProperties')
const isJSON5File = require('./isJSON5File')

/** @lends writeAsJsonSync */
async function writeAsJsonSync(filename, data) {
  await mkdirpAsync(path.dirname(filename))
  data = sortProperties(data)
  const isJSON5 = isJSON5File(filename)
  const content = isJSON5
    ? JSON5.stringify(data, null, 2)
    : JSON.stringify(data, null, 2)
  await writeFileAsync(filename, content)
}

module.exports = writeAsJsonSync
