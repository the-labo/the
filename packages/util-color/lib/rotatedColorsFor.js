/**
 * Get rotated colors for color
 * @memberof module:@the-/util-color
 * @function rotatedColorsFor
 * @param {string} [base='#38E'] - Base color
 * @param {Object} [options={}] - Optional settings
 * @param {number} [options.count=12] - Count of colors
 * @returns {string[]} Colors
 */
'use strict'

const { rotate } = require('acolor')

/** @lends module:@the-/util-color.rotatedColorsFor */
function rotatedColorsFor(base = '#38E', options = {}) {
  const { count = 12 } = options
  return new Array(count)
    .fill(null)
    .map((_, i, arr) => rotate(base, parseInt((360 * i) / arr.length)))
}

module.exports = rotatedColorsFor
