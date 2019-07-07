/**
 * Get file type of file
 * @memberof module:@the-/util-file
 * @function fileTypeOf
 * @param {string} filename
 * @returns {Object}
 */
'use strict'

const fileType = require('file-type')
const readChunk = require('read-chunk')

/** @lends module:@the-/util-file.fileTypeOf */
async function fileTypeOf(filename) {
  const buffer = await readChunk(filename, 0, fileType.minimumBytes)
  return fileType(buffer)
}

module.exports = fileTypeOf
