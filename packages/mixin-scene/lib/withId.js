/**
 * withId mixin
 * @memberof module:@the-/mixin-scene
 * @function withId
 * @param {function()} Class - Class to mix
 * @returns {function()} Mixed class
 */
/**
 * @memberOf module:@the-/mixin-scene.withId
 * @inner
 * @class WithHistoryMixed
 */
'use strict'

const asClassMixin = require('./helpers/asClassMixin')
const injectProperties = require('./helpers/injectProperties')

/** @lends module:@the-/mixin-scene.withId */
const withId = asClassMixin((Class) => {
  injectProperties(Class,
/** @lends module:@the-/mixin-scene.withId~WithHistoryMixed */
    {
    /**
     * Get id
     * @returns {?string} id
     */
    getId() {
      return this.get('id')
    },
    /**
     * Check if the id is known
     * @param {string} id
     * @returns {boolean}
     */
    isKnownId(id) {
      if (!id) {
        return false
      }
      return this.getId() === String(id)
    },
  })
})

module.exports = withId
