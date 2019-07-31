'use strict'

/**
 * Create count suffix strings
 * @memberof module:@the-/util-site
 * @function countSuffix
 * @param {number} count - Count
 * @param {Object} [options={}] - Optional settings
 * @returns {string} - Suffix string
 */
/** @lends module:@the-/util-site.countSuffix */
function countSuffix(count, options = {}) {
  const isEmpty = typeof count === 'undefined' || count === null
  return isEmpty ? '' : `(${String(count)})`
}

module.exports = countSuffix
