/**
 * Create a TheMail instance
 * @function create
 * @param {...*} args
 * @returns {TheMail}
 */
'use strict'

const TheMail = require('./TheMail')

/** @lends create */
function create(...args) {
  return new TheMail(...args)
}

module.exports = create
