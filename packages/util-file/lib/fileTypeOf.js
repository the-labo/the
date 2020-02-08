'use strict'

const FileType = require('file-type')

/**
 * Get file type of file
 * @memberof module:@the-/util-file
 * @function fileTypeOf
 * @param {string} filename
 * @returns {Object}
 */
async function fileTypeOf(filename) {
  return FileType.fromFile(filename)
}

module.exports = fileTypeOf
