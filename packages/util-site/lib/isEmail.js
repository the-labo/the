/**
 * Check if is email
 * @function isEmail
 * @param {string} email
 * @returns {boolean} Email or not
 */
'use strict'

const emailRegex = require('email-regex')

/** @lends isEmail */
function isEmail(value) {
  return Boolean(value && emailRegex().test(value))
}

module.exports = isEmail
