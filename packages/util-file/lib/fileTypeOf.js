'use strict'

const FileType = require('file-type')
const readChunk = require('read-chunk')

/**
 * Get file type of file
 * @memberof module:@the-/util-file
 * @function fileTypeOf
 * @param {string} filename
 * @returns {Object}
 */
async function fileTypeOf(filename) {
  const buffer = await readChunk(filename, 0, FileType.minimumBytes)
  return FileType.fromBuffer(buffer)
}

module.exports = fileTypeOf
