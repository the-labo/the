'use strict'

/**
 * @memberof module:@the-/util-file
 * @function readAsJsonSync
 * @param {string} filename
 * @returns {Object}
 */
const { readFileSync } = require('fs')
const JSON5 = require('json5')
const isJSON5File = require('./isJSON5File')
const statSync = require('./statSync')

/** @lends module:@the-/util-file.readAsJsonSync */
function readAsJsonSync(filename) {
  const stat = statSync(filename)
  if (!stat) {
    return null
  }
  const isJSON5 = isJSON5File(filename)
  const read = readFileSync(filename)
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

module.exports = readAsJsonSync
