'use strict'

const TheVideoConverter = require('./TheVideoConverter')

/**
 * Create a TheVideoConverter instance
 * @memberof module:@the-/video-converter
 * @function create
 * @param {...*} args
 * @returns {TheVideoConverter}
 */
function create(...args) {
  return new TheVideoConverter(...args)
}

module.exports = create
