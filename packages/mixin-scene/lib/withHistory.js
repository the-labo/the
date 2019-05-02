/**
 * withHistory mixin
 * @memberOf module:@the-/mixin-scene
 * @function withHistory
 * @param {function} Class - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

const qs = require('qs')
const asClassMixin = require('./helpers/asClassMixin')
const injectProperties = require('./helpers/injectProperties')

/** @lends module:@the-/mixin-scene.withHistory */
const withHistory = asClassMixin((Class) => {
  injectProperties(Class, {
    /**
     * Replace history with query
     * @param {?Object} query - Query data
     */
    replaceHistoryByQuery(query) {
      const queryString = qs.stringify(query)
      this.history.replace({ search: queryString ? `?${queryString}` : '' })
    },
  })
})

module.exports = withHistory
