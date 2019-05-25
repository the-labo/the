'use strict'
/**
 * Create a TheRTC instance
 * @memberof module:@the-/rtc
 * @function create
 * @param {...*} args
 * @returns {TheRTC}
 */
const TheRTC = require('./TheRTC')

/** @lends module:@the-/rtc.create */
function create(...args) {
  return new TheRTC(...args)
}

module.exports = create
