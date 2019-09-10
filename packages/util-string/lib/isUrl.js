'use strict'

const PATTERN = /^https?:/

/**
 * Check if is url
 * @memberof module:@the-/util-string
 * @function isURL
 * @param {string} value - String value to check
 * @returns {boolean} URL or not
 */
function isUrl(value) {
  return Boolean(value && PATTERN.test(value))
}

module.exports = isUrl
