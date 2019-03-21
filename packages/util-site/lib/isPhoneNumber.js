/**
 * Check if is phone number
 * @function isPhoneNumber
 * @param {string} value - String value to check
 * @returns {boolean} Phone number or not
 */
'use strict'

const PATTERN = /[0-9-+]$/

/** @lends isPhoneNumber */
function isPhoneNumber(value) {
  return Boolean(value && PATTERN.test(value))
}

module.exports = isPhoneNumber
