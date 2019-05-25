'use strict'
/**
 * Create a TheCache instance
 * @memberof module:@the-/cache
 * @function create
 * @param {...*} args
 * @returns {module:@the-/cache.TheCache}
 */
const TheCache = require('./TheCache')

/** @lends module:@the-/cache.create */
function create(...args) {
  return new TheCache(...args)
}

module.exports = create
