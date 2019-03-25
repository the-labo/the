/**
 * Create a TheGeo instance
 * @function create
 * @param {...*} args
 * @returns {TheGeo}
 */
'use strict'

const TheGeo = require('./TheGeo')

/** @lends create */
function create(...args) {
  return new TheGeo(...args)
}

module.exports = create
