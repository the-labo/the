'use strict'

const PATTERN = /[0-9-+]$/

/**
 * Check if is phone number
 * @memberof module:@the-/util-site
 * @function isPhoneNumber
 * @deprecated
 * @param {string} value - String value to check
 * @returns {boolean} Phone number or not
 */
function isPhoneNumber(value) {
  return Boolean(value && PATTERN.test(value))
}

module.exports = isPhoneNumber
