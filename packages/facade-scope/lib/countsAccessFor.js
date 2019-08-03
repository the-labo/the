/**
 * Scope access
 * @memberof module:@the-/facade-scope
 * @function countsAccessFor
 * @param {Object} scope
 * @returns {Object} - Face object for counts access
 */
'use strict'

/** @lends module:@the-/facade-scope.countsAccessFor */
function countsAccessFor(scope) {
  /**
   * @memberof module:@the-/facade-scope.countsAccessFor
   * @inner
   * @namespace countsAccess
   */
  const countsAccess = {
    /**
     * Counts
     * @type {Object}
     */
    get state() {
      return scope.get('counts')
    },
    /**
     * Has more or not
     * @returns {boolean}
     */
    hasMore() {
      if (!countsAccess.state) {
        return false
      }

      const {
        state: { length, offset, total },
      } = countsAccess
      return offset + length < total
    },
    /**
     * Set counts
     * @param {Object} counts
     */
    set(counts) {
      scope.set({ counts })
    },
  }

  Object.freeze(countsAccess)

  return countsAccess
}

module.exports = countsAccessFor
