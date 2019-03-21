/**
 * Create a TheSeat instance
 * @function create
 * @param {...*} args
 * @returns {TheSeat}
 */
'use strict'

const TheSeat = require('./TheSeat')

/** @lends create */
function create(...args) {
  return new TheSeat(...args)
}

module.exports = create
