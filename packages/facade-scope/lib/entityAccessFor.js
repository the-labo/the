'use strict'

/**
 * Scope access
 * @memberof module:@the-/facade-scope
 * @function entityAccessFor
 * @param {Object} scope
 * @returns {Object} - Face object for entityAccessFor access
 */
function entityAccessFor(scope) {
  /**
   * @memberof module:@the-/facade-scope.entityAccessFor
   * @inner
   * @namespace entityAccessFor
   */
  const entityAccessFor = {
    /**
     * @type {Object}
     */
    get state() {
      return scope.get('entity')
    },
    /**
     * Set entity
     * @param {Object} entity
     */
    set(entity) {
      scope.set({ entity })
    },
  }

  Object.freeze(entityAccessFor)

  return entityAccessFor
}

module.exports = entityAccessFor
