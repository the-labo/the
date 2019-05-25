'use strict'
/**
 * Create a TheState instance
 * @memberof module:@the-/state
 * @function create
 * @param {...*} args
 * @returns {TheState}
 */
const TheState = require('./TheState')

/** @lends create */
function create(...args) {
  return new TheState(...args)
}

module.exports = create
