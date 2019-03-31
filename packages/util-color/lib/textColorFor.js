/**
 * Get text color for background color
 * @function textColorFor
 * @param {string} backgroundColor
 * @returns {string} Text color
 */
'use strict'

const { isDark } = require('acolor')

/** @lends textColorFor */
function textColorFor (backgroundColor) {
  if (!backgroundColor) {
    return null
  }
  return isDark(backgroundColor) ? '#FFFFFF' : '#333333'
}

module.exports = textColorFor
