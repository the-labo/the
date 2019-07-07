'use strict'
/**
 * Create a TheSpell instance
 * @memberof module:@the-/spell
 * @function create
 * @param {...*} args
 * @returns {TheSpell}
 */
const TheSpell = require('./TheSpell')

/** @lends module:@the-/spell.create */
function create(...args) {
  return new TheSpell(...args)
}

module.exports = create
