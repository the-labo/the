/**
 * Detect if browser side
 * @function isBrowser
 * @returns {Boolean}
 */
'use strict'

/** @lends isBrowser */
function isBrowser() {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

module.exports = isBrowser
