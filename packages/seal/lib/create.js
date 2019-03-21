/**
 * Create a TheSeal instance
 * @function create
 * @param {...*} args
 * @returns {TheSeal}
 */
'use strict'

const TheSeal = require('./TheSeal')

/** @lends create */
function create(...args) {
  return new TheSeal(...args)
}

module.exports = create
