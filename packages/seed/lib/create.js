'use strict'

const TheSeed = require('./TheSeed')

/**
 * Create a TheSeed instance
 * @memberof module:@the-/seed
 * @function create
 * @param {...*} args
 * @returns {TheSeed}
 */
function create(...args) {
  return new TheSeed(...args)
}

module.exports = create
