/**
 * Bush scope access
 * @memberof module:@the-/facade-scope
 * @function busyFor
 * @param {Object} scope
 * @returns {Object} - Face object for busy access
 */
'use strict'

/** @lends module:@the-/facade-scope.busyFor */
function busyFor(scope) {
  /**
   * @memberof module:@the-/facade-scope
   * @inner
   * @namespace busy
   */
  const busy = {
    /**
     * Set to false
     */
    false() {
      scope.set({ busy: false })
    },
    /** State of busy */
    get state() {
      return scope.get('busy')
    },
    /**
     * Set to true
     */
    true() {
      scope.set({ busy: true })
    },
    /**
     * Set busy while handle pending
     * @param {function()} handler - Async handler
     * @returns {Promise<*>}
     */
    async while(handler) {
      busy.true()
      try {
        return await Promise.resolve(handler())
      } finally {
        busy.false()
      }
    },
  }

  Object.freeze(busy)

  return busy
}

module.exports = busyFor
