/**
 * Get size of file
 * @memberof module:@the-/util-file
 * @function fileSizeOf
 * @returns {Promise<number>}
 */
'use strict'

const { statAsync } = require('asfs')

/** @lends module:@the-/util-file.fileSizeOf */
async function fileSizeOf(filename) {
  const stat = await statAsync(filename).catch(() => null)
  return stat ? stat.size : null
}

module.exports = fileSizeOf
