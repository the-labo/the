'use strict'

const TheSupport = require('./TheSupport')

/**
 * Create a TheSupport instance
 * @memberof module:@the-/support
 * @function create
 * @param {...*} args
 * @returns {TheSupport}
 */
function create(...args) {
  return new TheSupport(...args)
}

module.exports = create
