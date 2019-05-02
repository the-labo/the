/**
 * Create a TheBin instance
 * @memberof module:@the-/bin
 * @function create
 * @param {...*} args
 * @returns {module:@the-/bin.TheBin}
 */
'use strict'

const TheBin = require('./TheBin')

/** @lends module:@the-/bin.create */
function create(...args) {
  const bin = new TheBin(...args)
  return bin.bind()
}

module.exports = create
