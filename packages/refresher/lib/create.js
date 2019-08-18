'use strict'

const TheRefresher = require('./TheRefresher')

/**
 * Create a TheRefresher instance
 * @memberof module:@the-/refresher
 * @function create
 * @param {...*} args
 * @returns {TheRefresher}
 */
function create(...args) {
  return new TheRefresher(...args)
}

module.exports = create
