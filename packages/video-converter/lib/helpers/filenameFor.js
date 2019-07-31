'use strict'

/**
 * Change file extension
 * @memberof module:@the-/video-converter
 * @function filenameFor
 * @param {Object} config
 */
const path = require('path')

/** @lends module:@the-/video-converter.filenameFor */
function filenameFor(filename, config = {}) {
  const { extname = path.extname(filename), suffix = '' } = config
  const dirname = path.dirname(filename)
  const basename = path.basename(filename, path.extname(filename))
  return path.join(dirname, basename + suffix + extname)
}

module.exports = filenameFor
