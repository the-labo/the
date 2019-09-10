'use strict'

const emailRegex = require('email-regex')

/**
 * Check if is email
 * @memberof module:@the-/util-string
 * @function isEmail
 * @deprecated
 * @param {string} email
 * @returns {boolean} Email or not
 */
function isEmail(value) {
  return Boolean(value && emailRegex().test(value))
}

module.exports = isEmail
