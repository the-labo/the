'use strict'

/**
 * Create a TheStore instance
 * @memberof module:@the-/store
 * @function create
 * @param {...*} args
 * @returns {TheStore}
 */
const TheStore = require('./TheStore')

/** @lends module:@the-/store.create */
function create(...args) {
  return new TheStore(...args)
}

module.exports = create
