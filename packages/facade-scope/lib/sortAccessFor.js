/**
 * Bush scope access
 * @memberof module:@the-/facade-scope
 * @function sortAccessFor
 * @param {Object} scope
 * @returns {Object} - Face object for sort access
 */
'use strict'

const absName = (name) => (name ? name.replace(/^-/, '') : null)

/** @lends module:@the-/facade-scope.sortAccessFor */
function sortAccessFor(scope) {
  /**
   * @memberof module:@the-/facade-scope.sortAccessFor
   * @inner
   * @namespace sortAccess
   */
  const sortAccess = {
    /**
     * Set sort
     * @param {string} name
     */
    set(name) {
      scope.set({ sort: name })
    },
    /**
     * Sort value
     * @type {string}
     */
    get state() {
      return scope.get('sort')
    },

    toggle(name) {
      const current = sortAccess.get()
      const isKnown = absName(current) === absName(name)
      if (isKnown) {
        name = /^-/.test(current) ? absName(current) : `-${current}`
      }
      sortAccess.set(name)
    },
  }

  Object.freeze(sortAccess)

  return sortAccess
}

module.exports = sortAccessFor
