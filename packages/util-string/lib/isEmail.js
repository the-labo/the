'use strict'

const emailRegex = require('email-regex')

/**
 * Check if is email
 * @memberof module:@the-/util-string
 * @function isEmail
 * @param {string} value
 * @returns {boolean} Email or not
 */
function isEmail(value) {
  return Boolean(value && emailRegex().test(value))
}

module.exports = isEmail
