'use strict'

const { statAsync } = require('asfs')

/**
 * Get size of file
 * @memberof module:@the-/util-file
 * @function fileSizeOf
 * @param filename
 * @returns {Promise<number>}
 */
async function fileSizeOf(filename) {
  const stat = await statAsync(filename).catch(() => null)
  return stat ? stat.size : null
}

module.exports = fileSizeOf
