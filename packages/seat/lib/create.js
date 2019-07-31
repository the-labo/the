'use strict'

/**
 * Create a TheSeat instance
 * @memberof module:@the-/seat
 * @function create
 * @param {...*} args
 * @returns {TheSeat}
 */
const TheSeat = require('./TheSeat')

/** @lends module:@the-/seat.create */
function create(...args) {
  return new TheSeat(...args)
}

module.exports = create
