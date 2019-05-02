/**
 * Create a ThePack instance
 * @memberof module:@the-/pack
 * @function create
 * @param {...*} args
 * @returns {ThePack}
 */
'use strict'

const ThePack = require('./ThePack')

/** @lends module:@the-/pack.create */
function create(...args) {
  return new ThePack(...args)
}

module.exports = create
