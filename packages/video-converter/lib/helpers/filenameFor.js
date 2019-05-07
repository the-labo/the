/**
 * Change file extension
 * @function changeExtension
 * @param {Object} config
 */
'use strict'

const path = require('path')

/** @lends filenameFor */
function filenameFor(filename, config = {}) {
  const { extname = path.extname(filename), suffix = '' } = config
  const dirname = path.dirname(filename)
  const basename = path.basename(filename, path.extname(filename))
  return path.join(dirname, basename + suffix + extname)
}

module.exports = filenameFor
