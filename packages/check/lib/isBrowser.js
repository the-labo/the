/**
 * Detect if browser side
 * @memberOf module:@the-/check
 * @function isBrowser
 * @returns {Boolean}
 */
'use strict'

/** @lends module:@the-/check.isBrowser */
function isBrowser() {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

module.exports = isBrowser
