'use strict'
/**
 * Create a TheResource instance
 * @memberof module:@the-/resource
 * @function create
 * @param {...*} args
 * @returns {TheResource}
 */
const TheResource = require('./TheResource')

/** @lends module:@the-/resource.create */
function create(...args) {
  return new TheResource(...args)
}

module.exports = create
