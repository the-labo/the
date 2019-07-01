/**
 * Scope access
 * @memberof module:@the-/facade-scope
 * @function filterAccessFor
 * @param {Object} scope
 * @returns {Object} - Face object for filter access
 */
'use strict'

/** @lends module:@the-/facade-scope.filterAccessFor */
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
    /**
     * Set filter
     * @param {Object} filter
     */
    set(filter) {
      scope.set({ filter })
    },
  }

  Object.freeze(filterAccess)

  return filterAccess
}

module.exports = filterAccessFor
