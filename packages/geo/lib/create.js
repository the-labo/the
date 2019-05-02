/**
 * Create a TheGeo instance
 * @memberof module:@the-/geo
 * @function create
 * @param {...*} args
 * @returns {TheGeo}
 */
'use strict'

const TheGeo = require('./TheGeo')

/** @lends module:@the-/geo.create */
function create(...args) {
  return new TheGeo(...args)
}

module.exports = create
