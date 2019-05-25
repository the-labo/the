'use strict'
/**
 * Check if is phone number
 * @memberof module:@the-/util-site
 * @deprecated
 * @function isPhoneNumber
 * @param {string} value - String value to check
 * @returns {boolean} Phone number or not
 */
const PATTERN = /[0-9-+]$/

/** @lends module:@the-/util-site.isPhoneNumber */
function isPhoneNumber(value) {
  return Boolean(value && PATTERN.test(value))
}

module.exports = isPhoneNumber
