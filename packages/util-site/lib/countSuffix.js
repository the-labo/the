/**
 * Create count suffix strings
 * @function countSuffix
 * @param {number} count - Count
 * @param {Object} [options={}] - Optional settings
 * @returns {string} - Suffix string
 */
'use strict'

/** @lends countSuffix */
function countSuffix(count, options = {}) {
  const isEmpty = typeof count === 'undefined' || count === null
  return isEmpty ? '' : `(${String(count)})`
}

module.exports = countSuffix
