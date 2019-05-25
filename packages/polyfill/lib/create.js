'use strict'
/**
 * Create a ThePolyfill instance
 * @memberof module:@the-/polyfill
 * @function create
 * @param {...*} args
 * @returns {ThePolyfill}
 */
const ThePolyfill = require('./ThePolyfill')

/** @lends module:@the-/polyfill.create */
function create(...args) {
  return new ThePolyfill(...args)
}

module.exports = create
