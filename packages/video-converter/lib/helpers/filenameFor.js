'use strict'

const path = require('path')

/**
 * Change file extension
 * @memberof module:@the-/video-converter
 * @function filenameFor
 * @param {Object} config
 * @returns {*}
 */
function filenameFor(filename, config = {}) {
  const { extname = path.extname(filename), suffix = '' } = config
  const dirname = path.dirname(filename)
  const basename = path.basename(filename, path.extname(filename))
  return path.join(dirname, basename + suffix + extname)
}

module.exports = filenameFor
