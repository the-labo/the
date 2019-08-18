'use strict'

const TheStore = require('./TheStore')

/**
 * Create a TheStore instance
 * @memberof module:@the-/store
 * @function create
 * @param {...*} args
 * @returns {TheStore}
 */
function create(...args) {
  return new TheStore(...args)
}

module.exports = create
