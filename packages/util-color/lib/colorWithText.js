/**
 * Get color with text
 * @function colorWithText
 * @param {string} text - Text
 * @param {Object} [options={}] - Optional settings
 * @returns {string} Color
 */
'use strict'

const { rotate } = require('acolor')

/** @lends colorWithText */
function colorWithText (text, options = {}) {
  const { base = '#38E' } = options
  const value = String(text).split('')
    .map((letter) => letter.charCodeAt(0))
    .reduce((result, value) => result + value, 0)
  return rotate(base, parseInt(value % 360.0))
}

colorWithText.of = function colorWithTextOf (base) {
  const cache = {}
  return function bound (text) {
    const cached = cache[text]
    if (cached) {
      return cached
    }
    const generated = colorWithText(text, { base })
    cache[text] = generated
    return generated
  }
}

module.exports = colorWithText
