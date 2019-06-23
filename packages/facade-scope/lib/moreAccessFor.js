/**
 * Bush scope access
 * @memberof module:@the-/facade-scope
 * @function moreAccessFor
 * @param {Object} scope
 * @returns {Object} - Face object for more access
 */
'use strict'

/** @lends module:@the-/facade-scope.moreAccessFor */
function moreAccessFor(scope) {
  /**
   * @memberof module:@the-/facade-scope.moreAccessFor
   * @inner
   * @namespace moreAccess
   */
  const moreAccess = {
    /**
     * Busy true while handling
     * @param {function()} handler
     * @returns {Promise<*>}
     */
    async busyWhile(handler) {
      moreAccess.setBusy(true)
      try {
        return await handler()
      } finally {
        moreAccess.setBusy(false)
      }
    },
    /**
     * Set moreBusy flag
     * @param {boolean} moreBusy
     */
    setBusy(moreBusy) {
      scope.set({ moreBusy })
    },
    /**
     * Set hasMore flag
     * @param {boolean} hasMore
     */
    setHas(hasMore) {
      scope.set({ hasMore })
    },
  }

  Object.freeze(moreAccess)

  return moreAccess
}

module.exports = moreAccessFor
