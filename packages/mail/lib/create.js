'use strict'

const TheMail = require('./TheMail')

/**
 * Create a TheMail instance
 * @memberof module:@the-/mail
 * @function create
 * @param {...*} args
 * @returns {TheMail}
 */
function create(...args) {
  return new TheMail(...args)
}

module.exports = create
