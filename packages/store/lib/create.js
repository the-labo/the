/**
 * Create a TheStore instance
 * @memberOf module:@the-/store
 * @function create
 * @param {...*} args
 * @returns {TheStore}
 */
'use strict'

const TheStore = require('./TheStore')

/** @lends module:@the-/store.create */
function create(...args) {
  return new TheStore(...args)
}

module.exports = create
