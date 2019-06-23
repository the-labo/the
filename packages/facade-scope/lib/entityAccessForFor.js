/**
 * Bush scope access
 * @memberof module:@the-/facade-scope
 * @function entityAccessForFor
 * @param {Object} scope
 * @returns {Object} - Face object for entityAccessFor access
 */
'use strict'

/** @lends module:@the-/facade-scope.entityAccessForFor */
function entityAccessForFor(scope) {
  /**
   * @memberof module:@the-/facade-scope.entityAccessForFor
   * @inner
   * @namespace entityAccessFor
   */
  const entityAccessFor = {
    /**
     * Set entity
     * @param {object} entity
     */
    set(entity) {
      scope.set({ entity })
    },
    /**
     * @type {object}
     */
    get state() {
      return scope.get('entity')
    },
  }

  Object.freeze(entityAccessFor)

  return entityAccessFor
}

module.exports = entityAccessForFor
