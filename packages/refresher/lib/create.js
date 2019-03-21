/**
 * Create a TheRefresher instance
 * @function create
 * @param {...*} args
 * @returns {TheRefresher}
 */
'use strict'

const TheRefresher = require('./TheRefresher')

/** @lends create */
function create(...args) {
  return new TheRefresher(...args)
}

module.exports = create
