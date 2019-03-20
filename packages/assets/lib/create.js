/**
 * Create a TheAssets instance
 * @memberOf module:@the-/assets
 * @function create
 * @param {...*} args
 * @returns {TheAssets}
 */
'use strict'

const TheAssets = require('./TheAssets')

/** @lends create */
function create(...args) {
  return new TheAssets(...args)
}

module.exports = create
