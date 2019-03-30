/**
 * withId mixin
 * @function withId
 * @param {function} Class - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

const asClassMixin = require('./helpers/asClassMixin')
const injectProperties = require('./helpers/injectProperties')

/** @lends withId */
const withId = asClassMixin((Class) => {
  injectProperties(Class, {
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
