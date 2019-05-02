/**
 * withTargets mixin
 * @memberof module:@the-/mixin-scene
 * @function withTargets
 * @param {function} Class - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

const { uniqueFilter } = require('@the-/util-array')
const asClassMixin = require('./helpers/asClassMixin')
const injectProperties = require('./helpers/injectProperties')

/** @lends module:@the-/mixin-scene.withTargets */
const withTargets = asClassMixin((Class) => {
  injectProperties(Class, {
    /**
     * Add targets
     * @param {Array} targets
     */
    addTargets(targets) {
      this.set({
        targets: [...this.get('targets'), ...targets].filter(
          uniqueFilter.by('id'),
        ),
      })
    },
    /**
     * Get ids of target
     * @returns {Array<string>}
     */
    getTargetIds() {
      return this.getTargets()
        .map(({ id }) => id)
        .filter(uniqueFilter())
    },
    /**
     * Get refs of target
     * @returns {Array<string>}
     */
    getTargetRefs() {
      return this.getTargets()
        .map(({ $$as, id }) => `${$$as}#${id}`)
        .filter(uniqueFilter())
    },
    /**
     * Get target values
     */
    getTargets() {
      return this.get('targets').filter(Boolean)
    },
  })
})

module.exports = withTargets
