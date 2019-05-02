/**
 * Create a TheResize instance
 * @memberof module:@the-/resize
 * @function create
 * @param {...*} args
 * @returns {TheResize}
 */
'use strict'

const TheResize = require('./TheResize')

/** @lends module:@the-/resize.create */
function create(...args) {
  return new TheResize(...args)
}

module.exports = create
