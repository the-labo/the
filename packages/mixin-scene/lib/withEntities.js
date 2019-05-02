/**
 * withEntities mixin
 * @memberof module:@the-/mixin-scene
 * @function withEntities
 * @param {function} Class - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

const { uniqueFilter } = require('@the-/util-array')
const asClassMixin = require('./helpers/asClassMixin')
const injectProperties = require('./helpers/injectProperties')

/** @lends module:@the-/mixin-scene.withEntities */
const withEntities = asClassMixin((Class) => {
  injectProperties(Class, {
    /**
     * Add entities
     * @param {Object[]} entities
     * @param {Object} [options={}] - Optional settings
     */
    addEntities(entities, options = {}) {
      const added = [...this.getEntities(), ...entities].filter(
        uniqueFilter.by('id'),
      )
      const { sorter = null } = options
      this.set({
        entities: sorter ? added.sort(sorter) : added,
      })
    },
    /**
     * Add a entity
     * @param {Object} entity
     * @param {Object} [options={}] - Optional settings
     */
    addEntity(entity, options = {}) {
      this.addEntities([entity], options)
    },
    /**
     * Delete entity
     * @param {Object} entity
     */
    deleteEntity(entity) {
      const entities = this.getEntities().filter(
        (filtering) => String(entity.id) !== String(filtering.id),
      )
      this.set({ entities })
    },
    /**
     * Get entities
     * @returns {Object[]}
     */
    getEntities() {
      return this.get('entities')
    },
    getEntityIds() {
      return this.getEntities().map(({ id }) => String(id))
    },
    isKnownEntity(entity) {
      return this.get('entities').some(
        ({ id }) => String(id) === String(entity.id),
      )
    },
    /**
     * Receive an entity
     * @param {Object} entity - Entity to set
     * @param {Object} [options={}] - Optional settings
     */
    receiveEntity(entity, options = {}) {
      const { sorter = null } = options
      const isKnown = this.isKnownEntity(entity)
      if (isKnown) {
        this.updateEntity(entity)
      } else {
        this.addEntity(entity, { sorter })
      }
    },
    /**
     * Update existing entity
     * @param {Object} entity
     */
    updateEntity(entity) {
      const entities = this.getEntities().map((mapping) =>
        String(entity.id) === String(mapping.id) ? entity : mapping,
      )
      this.set({ entities })
    },
  })
})

module.exports = withEntities
