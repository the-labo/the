'use strict'

const { alpha: withAlpha } = require('acolor')

/**
 * Get color with alpha
 * @memberof module:@the-/util-color
 * @function colorWithAlpha
 * @param {string} color
 * @param {number} alpha
 * @returns {?string} color
 */
function colorWithAlpha(color, alpha) {
  if (!color) {
    return null
  }

  try {
    return withAlpha(color, alpha)
  } catch (e) {
    console.warn(`[@the-/uti-color] Failed to add alpha to color: ${color}`)
    return color
  }
}

module.exports = colorWithAlpha
