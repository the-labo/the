/**
 * Create a TheFacebook instance
 * @function create
 * @param {...*} args
 * @returns {TheFacebook}
 */
'use strict'

const TheFacebook = require('./TheFacebook')

/** @lends create */
function create(...args) {
  return new TheFacebook(...args)
}

module.exports = create
