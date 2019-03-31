/**
 * Change color alpha
 * @function colorAlpha
 * @param {string} color - Color to change
 * @param {number} [alpha=1] - Alpha value to set
 * @returns {string} Color string
 */
'use strict'

const { alpha: setAlpha } = require('acolor')

/** @lends colorAlpha */
function colorAlpha(color, alpha) {
  return setAlpha(color, alpha)
}

module.exports = colorAlpha
