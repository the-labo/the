'use strict'

/**
 * Scope access
 * @memberof module:@the-/facade-scope
 * @function pageAccessFor
 * @param {Object} scope
 * @returns {Object} - Face object for page access
 */
function pageAccessFor(scope) {
  /**
   * @memberof module:@the-/facade-scope.pageAccessFor
   * @inner
   * @namespace pageAccess
   */
  const pageAccess = {
    /**
     * Page object
     * @type {Object}
     */
    get state() {
      return {
        number: pageAccess.getNumber(),
        size: pageAccess.getSize(),
      }
    },
    get() {
      return pageAccess.state
    },
    /**
     * Get page number
     * @returns {number} - Number of page
     */
    getNumber() {
      return scope.get('pageNumber') || 1
    },
    /**
     * Get page size
     * @returns {number}
     */
    getSize() {
      return scope.get('pageSize') || 25
    },
    /**
     * Increment page size
     * @param {Object} [options={}] - Optional setting
     */
    more(options = {}) {
      const { adding = 0, rate = 2 } = options
      const size = pageAccess.getSize()
      pageAccess.setSize(Math.floor(size * rate) + adding)
    },
    /**
     * Increment page number
     */
    next(opitons = {}) {
      const { amount = 1 } = opitons
      const number = pageAccess.getNumber()
      pageAccess.setNumber(number + amount)
    },
    /**
     * Set
     * @param page
     */
    set(page) {
      const { number, size } = page
      pageAccess.setNumber(number)
      pageAccess.setSize(size)
    },
    /**
     * Set number
     * @param {number} pageNumber
     */
    setNumber(pageNumber) {
      scope.set({ pageNumber })
    },
    /**
     * Set size
     * @param {number} pageSize
     */
    setSize(pageSize) {
      scope.set({ pageSize })
    },
  }

  Object.freeze(pageAccess)

  return pageAccess
}

module.exports = pageAccessFor
