/**
 * Create a TheMail instance
 * @memberof module:@the-/mail
 * @function create
 * @param {...*} args
 * @returns {TheMail}
 */
'use strict'

const TheMail = require('./TheMail')

/** @lends module:@the-/mail.create */
function create(...args) {
  return new TheMail(...args)
}

module.exports = create
