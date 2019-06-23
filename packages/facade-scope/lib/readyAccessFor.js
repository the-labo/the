/**
 * Bush scope access
 * @memberof module:@the-/facade-scope
 * @function readyAccessFor
 * @param {Object} scope
 * @returns {Object} - Face object for ready access
 */
'use strict'

/** @lends module:@the-/facade-scope.readyAccessFor */
function readyAccessFor(scope) {
  /**
   * @memberof module:@the-/facade-scope.readyAccessFor
   * @inner
   * @namespace readyAccess
   */
  const readyAccess = {
    /**
     * Set to false
     */
    false() {
      scope.set({ ready: false })
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
    async when(handler) {
      const result = await handler()
      readyAccess.true()
      return result
    },
  }

  Object.freeze(readyAccess)

  return readyAccess
}

module.exports = readyAccessFor
