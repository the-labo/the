'use strict'

const TheSeal = require('./TheSeal')

/**
 * Create a TheSeal instance
 * @memberof module:@the-/seal
 * @function create
 * @param {...*} args
 * @returns {TheSeal}
 */
function create(...args) {
  return new TheSeal(...args)
}

module.exports = create
