/**
 * Bush scope access
 * @memberof module:@the-/facade-scope
 * @function busyAccessFor
 * @param {Object} scope
 * @returns {module:@the-/facade-scope.busyAccessFor~busyAccess} - Face object for busy access
 */
'use strict'

/** @lends module:@the-/facade-scope.busyAccessFor */
function busyAccessFor(scope) {
  /**
   * @memberof module:@the-/facade-scope.busyAccessFor
   * @inner
   * @namespace busyAccess
   */
  const busyAccess = {
    /**
     * State of busyAccess
     * @type {boolean}
     */
    get state() {
      return scope.get('busy')
    },
    /**
     * Set to false
     */
    false() {
      scope.set({ busy: false })
    },
    /**
     * Set to true
     */
    true() {
      scope.set({ busy: true })
    },
    /**
     * Set busyAccess while handle pending
     * @param {function()} handler - Async handler
     * @returns {Promise<*>}
     * @example
     * busyAccess.while(async () => {
     *   await doSomethingAsync()
     * })
     */
    async while(handler) {
      busyAccess.true()
      try {
        return await Promise.resolve(handler())
      } finally {
        busyAccess.false()
      }
    },
  }

  Object.freeze(busyAccess)

  return busyAccess
}

module.exports = busyAccessFor
