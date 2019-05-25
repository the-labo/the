'use strict'
/**
 * Resolve template file path.
 * @function _tmpl
 * @private
 * @param {string} name - Template name.
 * @returns {string} - Resolved path.
 */
const path = require('path')
const TMPL_DIR = path.resolve(__dirname, '../asset/templates')

/** @lends module:@the-/templates._tmpl */
function _tmpl(name) {
  return path.resolve(TMPL_DIR, name)
}

module.exports = _tmpl
