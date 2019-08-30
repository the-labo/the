'use strict'

/**
 * Scope access
 * @memberof module:@the-/facade-scope
 * @function countsAccessFor
 * @param {Object} scope
 * @returns {Object} - Face object for counts access
 */
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
      return scope.get('counts') || {}
    },
    /**
     * Decrease count
     * @param {number} amount = 1
     */
    decrease(amount = 1) {
      countsAccess.increase(amount * -1)
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
     * Increase count
     * @param {number} amount = 1
     */
    increase(amount = 1) {
      const {
        state: { length = 0, offset = 0, total = 0 },
      } = countsAccess
      countsAccess.set({
        length: length + amount,
        offset,
        total: total + amount,
      })
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
