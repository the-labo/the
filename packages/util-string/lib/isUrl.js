'use strict'

const PATTERNS = [/^https?:\S+$/, /^data:\S+$/]

/**
 * Check if is url
 * @memberof module:@the-/util-string
 * @function isURL
 * @param {string} value - String value to check
 * @returns {boolean} URL or not
 */
function isUrl(value) {
  return Boolean(value && PATTERNS.some((p) => p.test(value)))
}

module.exports = isUrl
