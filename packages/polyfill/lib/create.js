/**
 * Create a ThePolyfill instance
 * @function create
 * @param {...*} args
 * @returns {ThePolyfill}
 */
'use strict'

const ThePolyfill = require('./ThePolyfill')

/** @lends create */
function create(...args) {
  return new ThePolyfill(...args)
}

module.exports = create
