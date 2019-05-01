/**
 * @memberof module:@the-/util-file
 * @function isJSON5File
 * @param {string} filename
 * @returns {Boolean}
 */
'use strict'
const path = require('path')

/** @lends module:@the-/util-file.isJSON5File */
function isJSON5File(filename) {
  const extname = path.extname(filename)
  return ['.json5'].includes(extname)
}

module.exports = isJSON5File
