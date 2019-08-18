'use strict'

const ThePack = require('./ThePack')

/**
 * Create a ThePack instance
 * @memberof module:@the-/pack
 * @function create
 * @param {...*} args
 * @returns {ThePack}
 */
function create(...args) {
  return new ThePack(...args)
}

module.exports = create
