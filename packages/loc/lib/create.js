'use strict'

const TheLoc = require('./TheLoc')

/**
 * Create a TheLoc instance
 * @memberof module:@the-/loc
 * @function create
 * @param {...*} args
 * @returns {TheLoc}
 */
function create(...args) {
  return new TheLoc(...args)
}

module.exports = create
