/**
 * Detect if browser side
 * @memberof module:@the-/check
 * @function isBrowser
 * @returns {boolean}
 */
'use strict'

/** @lends module:@the-/check.isBrowser */
function isBrowser() {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

module.exports = isBrowser
