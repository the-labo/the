'use strict'

const { isDark, darken } = require('acolor')

/**
 * Make sure a color is dark enough to work with while
 * @param {string} color
 * @param {Object} [options={}] - Optional settings
 * @return {?string}
 */
function colorAsDarkened (color, options = {}) {
  const {
    tryMaxCount = 10,
    tryAmount = 0.05
  } = options
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