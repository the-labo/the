'use strict'

const { uniqueFilter } = require('@the-/util-array')

/**
 * Scope access
 * @memberof module:@the-/facade-scope
 * @function entitiesAccessFor
 * @param {Object} scope
 * @returns {module:@the-/facade-scope.entitiesAccessFor~entities} - Face object for entities access
 */
function entitiesAccessFor(scope) {
  /**
   * @memberof module:@the-/facade-scope.entitiesAccessFor
   * @inner
   * @namespace entitiesAccess
   */
  const entitiesAccess = {
    /**
     * @type {Array<module:@the-/facade-scope.entitiesAccessFor.Entity>}
     */
    get state() {
      return scope.get('entities') || []
    },
    /**
     * Add entities
     * @param {Array<module:@the-/facade-scope.entitiesAccessFor.Entity>} entities
     * @param {Object} options - Optional settings
     */
    add(entities, options = {}) {
      const { sorter = null, unique = true } = options
      const added = [].concat(entitiesAccess.state, entities)
      const filtered = unique
        ? added.filter(uniqueFilter.by('id'))
        : [...added].filter(Boolean)
      const sorted = sorter ? filtered.sort(sorter) : added
      entitiesAccess.set(sorted)
    },
    /**
     * Add an module:@the-/facade-scope.entitiesAccessFor.Entity
     * @param {Object} entity - Entity to add
     * @param {Object} [options={}] - Optional settings
     */
    addOne(entity, options = {}) {
      entitiesAccess.add([entity], options)
    },
    isKnownOne(entity) {
      return entitiesAccess.state.some((e) => e.id === entity.id)
    },
    /**
     * Receive one
     * @param {module:@the-/facade-scope.entitiesAccessFor.Entity} entity
     * @param {Object} options - Optional settings
     * @param {function()} [options.sorter=null] - Entity array sorter function
     */
    receiveOne(entity, options = {}) {
      const { sorter } = options
      const isKnownOne = entitiesAccess.isKnownOne(entity)
      if (isKnownOne) {
        entitiesAccess.updateOne(entity)
      } else {
        entitiesAccess.addOne(entity, { sorter, unique: true })
      }
    },
    /**
     * Delete one
     * @param {module:@the-/facade-scope.entitiesAccessFor.Entity} entity - Deleting id
     */
    removeOne(entity) {
      const removed = [...entitiesAccess.state].filter(
        (e) => entity.id !== e.id,
      )
      entitiesAccess.set(removed)
    },
    /**
     * Set entities
     * @param {module:@the-/facade-scope.entitiesAccessFor.Entity[]} entities - Entities to set
     */
    set(entities) {
      scope.set({ entities })
    },
    /**
     * Update one
     * @param {module:@the-/facade-scope.entitiesAccessFor.Entity} entity Entity to update
     */
    updateOne(entity) {
      const updated = [...entitiesAccess.state].map((e) =>
        e.id === entity.id ? entity : e,
      )
      entitiesAccess.set(updated)
    },
  }

  Object.freeze(entitiesAccess)

  return entitiesAccess
}

module.exports = entitiesAccessFor

/**
 * @memberof module:@the-/facade-scope.entitiesAccessFor
 * @typedef Entity
 * @property {id} - Id
 */
