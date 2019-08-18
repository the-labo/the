'use strict'

const ThePolyfill = require('./ThePolyfill')

/**
 * Create a ThePolyfill instance
 * @memberof module:@the-/polyfill
 * @function create
 * @param {...*} args
 * @returns {ThePolyfill}
 */
function create(...args) {
  return new ThePolyfill(...args)
}

module.exports = create
