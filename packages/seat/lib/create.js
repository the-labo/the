'use strict'

const TheSeat = require('./TheSeat')

/**
 * Create a TheSeat instance
 * @memberof module:@the-/seat
 * @function create
 * @param {...*} args
 * @returns {TheSeat}
 */
function create(...args) {
  return new TheSeat(...args)
}

module.exports = create
