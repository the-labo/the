'use strict'

const TheBin = require('./TheBin')

/**
 * Create a TheBin instance
 * @memberof module:@the-/bin
 * @function create
 * @param {...*} args
 * @returns {module:@the-/bin.TheBin}
 */
function create(...args) {
  const bin = new TheBin(...args)
  return bin.bind()
}

module.exports = create
