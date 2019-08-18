'use strict'

const TheAssets = require('./TheAssets')

/**
 * Create a TheAssets instance
 * @memberof module:@the-/assets
 * @function create
 * @param {...*} args
 * @returns {module:@the-/assets.TheAssets}
 */
function create(...args) {
  return new TheAssets(...args)
}

module.exports = create
