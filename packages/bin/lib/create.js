/**
 * Create a TheBin instance
 * @memberOf module:@the-/bin
 * @function create
 * @param {...*} args
 * @returns {TheBin}
 */
'use strict'

const TheBin = require('./TheBin')

/** @lends create */
function create(...args) {
  const bin = new TheBin(...args)
  return bin.bind()
}

module.exports = create
