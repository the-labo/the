/**
 * Get color with alpha
 * @function colorWithAlpha
 * @param {string} color
 * @param {number} alpha
 * @returns {string} color
 */
'use strict'

const { alpha: withAlpha } = require('acolor')

/** @lends colorWithAlpha */
function colorWithAlpha (color, alpha) {
  if (!color) {
    return null
  }
  return withAlpha(color, alpha)
}

module.exports = colorWithAlpha
