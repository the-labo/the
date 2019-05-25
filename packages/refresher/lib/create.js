'use strict'
/**
 * Create a TheRefresher instance
 * @memberof module:@the-/refresher
 * @function create
 * @param {...*} args
 * @returns {TheRefresher}
 */
const TheRefresher = require('./TheRefresher')

/** @lends module:@the-/refresher.create */
function create(...args) {
  return new TheRefresher(...args)
}

module.exports = create
