'use strict'

const TheResource = require('./TheResource')

/**
 * Create a TheResource instance
 * @memberof module:@the-/resource
 * @function create
 * @param {...*} args
 * @returns {TheResource}
 */
function create(...args) {
  return new TheResource(...args)
}

module.exports = create
