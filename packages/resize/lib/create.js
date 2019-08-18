'use strict'

const TheResize = require('./TheResize')

/**
 * Create a TheResize instance
 * @memberof module:@the-/resize
 * @function create
 * @param {...*} args
 * @returns {TheResize}
 */
function create(...args) {
  return new TheResize(...args)
}

module.exports = create
