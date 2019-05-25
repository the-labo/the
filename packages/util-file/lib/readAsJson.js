'use strict'
/**
 * Read as json
 * @memberof module:@the-/util-file
 * @function readAsJson
 * @param {string} filename
 * @returns {Promise<Object>}
 */
const { readFileAsync, statAsync } = require('asfs')
const JSON5 = require('json5')
const isJSON5File = require('./isJSON5File')

/** @lends module:@the-/util-file.readAsJson */
async function readAsJson(filename) {
  const stat = await statAsync(filename).catch(() => null)
  if (!stat) {
    return null
  }
  const isJSON5 = isJSON5File(filename)
  const read = await readFileAsync(filename)
  try {
    if (isJSON5) {
      return JSON5.parse(read)
    } else {
      return JSON.parse(read)
    }
  } catch (e) {
    throw new Error(`[TheFileUtil] Failed to read: ${filename} (${e.message})`)
  }
}

module.exports = readAsJson
