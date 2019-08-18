'use strict'

/**
 * Scope access
 * @memberof module:@the-/facade-scope
 * @function readyAccessFor
 * @param {Object} scope
 * @returns {Object} - Face object for ready access
 */
function readyAccessFor(scope) {
  /**
   * @memberof module:@the-/facade-scope.readyAccessFor
   * @inner
   * @namespace readyAccess
   */
  const readyAccess = {
    get state() {
      return scope.get('ready')
    },
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
      scope.set({ ready: true })
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
