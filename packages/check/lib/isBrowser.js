'use strict'

/**
 * Detect if browser side
 * @memberof module:@the-/check
 * @function isBrowser
 * @returns {boolean}
 */
/** @lends module:@the-/check.isBrowser */
function isBrowser() {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

module.exports = isBrowser
