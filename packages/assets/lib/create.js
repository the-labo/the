'use strict'
/**
 * Create a TheAssets instance
 * @memberof module:@the-/assets
 * @function create
 * @param {...*} args
 * @returns {module:@the-/assets.TheAssets}
 */
const TheAssets = require('./TheAssets')

/** @lends module:@the-/assets.create */
function create(...args) {
  return new TheAssets(...args)
}

module.exports = create
