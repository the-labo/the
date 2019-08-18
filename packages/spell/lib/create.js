'use strict'

const TheSpell = require('./TheSpell')

/**
 * Create a TheSpell instance
 * @memberof module:@the-/spell
 * @function create
 * @param {...*} args
 * @returns {TheSpell}
 */
function create(...args) {
  return new TheSpell(...args)
}

module.exports = create
