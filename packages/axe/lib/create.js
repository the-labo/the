'use strict'

/**
 * Create a TheAxe instance
 * @memberof module:@the-/axe
 * @function create
 * @param {...*} args
 * @returns {TheAxe}
 */
const TheAxe = require('./TheAxe')

/** @lends module:@the-/axe.create */
function create(...args) {
  return new TheAxe(...args)
}

module.exports = create
