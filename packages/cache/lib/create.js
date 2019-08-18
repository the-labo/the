'use strict'

const TheCache = require('./TheCache')

/**
 * Create a TheCache instance
 * @memberof module:@the-/cache
 * @function create
 * @param {...*} args
 * @returns {module:@the-/cache.TheCache}
 */
function create(...args) {
  return new TheCache(...args)
}

module.exports = create
