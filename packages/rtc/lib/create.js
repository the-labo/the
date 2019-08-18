'use strict'

const TheRTC = require('./TheRTC')

/**
 * Create a TheRTC instance
 * @memberof module:@the-/rtc
 * @function create
 * @param {...*} args
 * @returns {TheRTC}
 */
function create(...args) {
  return new TheRTC(...args)
}

module.exports = create
