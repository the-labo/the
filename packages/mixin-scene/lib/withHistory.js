'use strict'
/**
 * withHistory mixin
 * @memberof module:@the-/mixin-scene
 * @deprecated
 * @function withHistory
 * @param {function()} Class - Class to mix
 * @returns {function()} Mixed class
 */
/**
 * @memberof module:@the-/mixin-scene.withHistory
 * @inner
 * @class WithHistoryMixed
 */
const qs = require('qs')
const asClassMixin = require('./helpers/asClassMixin')
const injectProperties = require('./helpers/injectProperties')

/** @lends module:@the-/mixin-scene.withHistory */
const withHistory = asClassMixin((Class) => {
  injectProperties(
    Class,
    /** @lends module:@the-/mixin-scene.withHistory~WithHistoryMixed */
    {
      /**
       * Replace history with query
       * @param {?Object} query - Query data
       */
      replaceHistoryByQuery(query) {
        const queryString = qs.stringify(query)
        this.history.replace({ search: queryString ? `?${queryString}` : '' })
      },
    },
  )
})

module.exports = withHistory
