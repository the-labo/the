/**
 * Get color with alpha
 * @memberOf module:@the-/util-color
 * @function colorWithAlpha
 * @param {string} color
 * @param {number} alpha
 * @returns {string} color
 */
'use strict'

const { alpha: withAlpha } = require('acolor')

/** @lends module:@the-/util-color.colorWithAlpha */
function colorWithAlpha(color, alpha) {
  if (!color) {
    return null
  }
  return withAlpha(color, alpha)
}

module.exports = colorWithAlpha
