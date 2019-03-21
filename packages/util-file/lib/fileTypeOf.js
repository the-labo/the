/**
 * Get file type of file
 * @function fileTypeOf
 * @param {string} filename
 * @returns {Object}
 */
'use strict'

const fileType = require('file-type')
const readChunk = require('read-chunk')

/** @lends fileTypeOf */
async function fileTypeOf(filename) {
  const buffer = await readChunk(filename, 0, fileType.minimumBytes)
  return fileType(buffer)
}

module.exports = fileTypeOf
