'use strict'

const { rotate } = require('acolor')
const Color = require('color')

/**
 * Get rotated colors for color
 * @memberof module:@the-/util-color
 * @function rotatedColorsFor
 * @param {string} [base='#38E'] - Base color
 * @param {Object} [options={}] - Optional settings
 * @param {number} [options.count=12] - Count of colors
 * @param {boolean} [options.sort=false] - Should sort result by hue
 * @returns {string[]} Colors
 */
function rotatedColorsFor(base = '#38E', options = {}) {
  const { count = 12, sort = false } = options
  const colors = new Array(count).fill(null).map((_, i, arr) =>
    rotate(base, parseInt((360 * i) / arr.length), {
      lch: true,
    }),
  )
  if (sort) {
    return colors.sort((a, b) => Color(a).hue() - Color(b).hue())
  }

  return colors
}

module.exports = rotatedColorsFor
