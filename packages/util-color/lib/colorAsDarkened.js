'use strict'

const { darken, isDark } = require('acolor')

/**
 * Make sure a color is dark enough to work with while
 * @param {string} color
 * @param {Object} [options={}] - Optional settings
 * @returns {?string}
 */
function colorAsDarkened(color, options = {}) {
  const { tryAmount = 0.05, tryMaxCount = 10 } = options
  if (!color) {
    return null
  }
  for (let i = 0; i < tryMaxCount; i++) {
    const enough = isDark(color)
    if (enough) {
      return color
    }
    color = darken(color, tryAmount)
  }
  return color
}

module.exports = colorAsDarkened
