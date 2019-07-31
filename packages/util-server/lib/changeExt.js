'use strict'

/**
 * Change file extension
 * @param {string} filename - Filename to change
 * @param {string} ext - New file extension
 */
const path = require('path')

/** @lends changeExt */
function changeExt(filename, ext = null) {
  return path.join(
    ...[
      path.dirname(filename),
      path.basename(filename, path.extname(filename)) + ext,
    ].filter(Boolean),
  )
}

module.exports = changeExt
