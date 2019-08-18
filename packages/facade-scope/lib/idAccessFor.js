'use strict'

/**
 * Scope access
 * @memberof module:@the-/facade-scope
 * @function idAccessFor
 * @param {Object} scope
 * @returns {Object} - Face object for id access
 */
function idAccessFor(scope) {
  /**
   * @memberof module:@the-/facade-scope.idAccessFor
   * @inner
   * @namespace idAccess
   */
  const idAccess = {
    /**
     * @type {string}
     */
    get state() {
      return scope.get('id')
    },
    /**
     * Known or not
     * @param {string} id
     * @returns {boolean}
     */
    isKnown(id) {
      return idAccess.state === id
    },
    /**
     * Set id
     * @param {string} id
     */
    set(id) {
      scope.set({ id })
    },
  }

  Object.freeze(idAccess)

  return idAccess
}

module.exports = idAccessFor
