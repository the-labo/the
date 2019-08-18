'use strict'

const fileType = require('file-type')
const readChunk = require('read-chunk')

/**
 * Get file type of file
 * @memberof module:@the-/util-file
 * @function fileTypeOf
 * @param {string} filename
 * @returns {Object}
 */
async function fileTypeOf(filename) {
  const buffer = await readChunk(filename, 0, fileType.minimumBytes)
  return fileType(buffer)
}

module.exports = fileTypeOf
