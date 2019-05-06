/**
 * Check if is email
 * @memberof module:@the-/util-site
 * @deprecated
 * @function isEmail
 * @param {string} email
 * @returns {boolean} Email or not
 */
'use strict'

const emailRegex = require('email-regex')

/** @lends module:@the-/util-site.isEmail */
function isEmail(value) {
  return Boolean(value && emailRegex().test(value))
}

module.exports = isEmail
