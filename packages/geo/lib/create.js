'use strict'

const TheGeo = require('./TheGeo')

/**
 * Create a TheGeo instance
 * @memberof module:@the-/geo
 * @function create
 * @param {...*} args
 * @returns {TheGeo}
 */
function create(...args) {
  return new TheGeo(...args)
}

module.exports = create
