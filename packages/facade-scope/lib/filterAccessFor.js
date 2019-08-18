'use strict'

/**
 * Scope access
 * @memberof module:@the-/facade-scope
 * @function filterAccessFor
 * @param {Object} scope
 * @returns {Object} - Face object for filter access
 */
function filterAccessFor(scope) {
  /**
   * @memberof module:@the-/facade-scope.filterAccessFor
   * @inner
   * @namespace filterAccess
   */
  const filterAccess = {
    /**
     * @type {Object}
     */
    get state() {
      return scope.get('filter')
    },
    get() {
      return filterAccess.state
    },
    /**
     * Set filter
     * @param {Object} filter
     */
    set(filter) {
      if (filter === null) {
        scope.init('filter')
        return
      }

      scope.set({ filter })
    },
  }

  Object.freeze(filterAccess)

  return filterAccess
}

module.exports = filterAccessFor
