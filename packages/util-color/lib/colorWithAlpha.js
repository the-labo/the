'use strict'

/**
 * Get color with alpha
 * @memberof module:@the-/util-color
 * @function colorWithAlpha
 * @param {string} color
 * @param {number} alpha
 * @returns {string} color
 */
const { alpha: withAlpha } = require('acolor')

/** @lends module:@the-/util-color.colorWithAlpha */
function colorWithAlpha(color, alpha) {
  if (!color) {
    return null
  }

  return withAlpha(color, alpha)
}

module.exports = colorWithAlpha
