'use strict'

const { isDark } = require('acolor')

/**
 * Get text color for background color
 * @memberof module:@the-/util-color
 * @function textColorFor
 * @param {string} backgroundColor
 * @param {Object} [options={}]
 * @returns {?string} Text color
 */
function textColorFor(backgroundColor, options = {}) {
  if (!backgroundColor) {
    return null
  }

  const { forDark = '#FFFFFF', forLight = '#333333' } = options

  try {
    return isDark(backgroundColor) ? forDark : forLight
  } catch (e) {
    return forLight
  }
}

module.exports = textColorFor
