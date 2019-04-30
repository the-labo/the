/**
 * Create a TheSeat instance
 * @memberOf module:@the-/seat
 * @function create
 * @param {...*} args
 * @returns {TheSeat}
 */
'use strict'

const TheSeat = require('./TheSeat')

/** @lends module:@the-/seat.create */
function create(...args) {
  return new TheSeat(...args)
}

module.exports = create
