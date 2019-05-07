/**
 * Create a TheVideoConverter instance
 * @memberof module:@the-/video-converter
 * @function create
 * @param {...*} args
 * @returns {TheVideoConverter}
 */
'use strict'

const TheVideoConverter = require('./TheVideoConverter')

/** @lends module:@the-/video-converter.create */
function create(...args) {
  return new TheVideoConverter(...args)
}

module.exports = create
