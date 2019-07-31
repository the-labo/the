'use strict'

/**
 * Get text color for background color
 * @memberof module:@the-/util-color
 * @function textColorFor
 * @param {string} backgroundColor
 * @returns {string} Text color
 */
const { isDark } = require('acolor')

/** @lends module:@the-/util-color.textColorFor */
function textColorFor(backgroundColor) {
  if (!backgroundColor) {
    return null
  }
  return isDark(backgroundColor) ? '#FFFFFF' : '#333333'
}

module.exports = textColorFor
