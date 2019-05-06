/**
 * Create a TheSupport instance
 * @memberof module:@the-/support
 * @function create
 * @param {...*} args
 * @returns {TheSupport}
 */
'use strict'

const TheSupport = require('./TheSupport')

/** @lends module:@the-/support.create */
function create(...args) {
  return new TheSupport(...args)
}

module.exports = create
