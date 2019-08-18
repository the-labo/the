'use strict'

const path = require('path')

/**
 * @memberof module:@the-/util-file
 * @function isJSON5File
 * @param {string} filename
 * @returns {boolean}
 */
function isJSON5File(filename) {
  const extname = path.extname(filename)
  return ['.json5'].includes(extname)
}

module.exports = isJSON5File
