/**
 * withPage mixin
 * @memberof module:@the-/mixin-scene
 * @function withPage
 * @param {function()} Class - Class to mix
 * @returns {function()} Mixed class
 */
/**
 * @memberof module:@the-/mixin-scene.withPage
 * @inner
 * @class WithPageMixed
 */
'use strict'

const asClassMixin = require('./helpers/asClassMixin')
const injectProperties = require('./helpers/injectProperties')

/** @lends module:@the-/mixin-scene.withPage */
const withPage = asClassMixin((Class) => {
  injectProperties(
    Class,
    /** @lends module:@the-/mixin-scene.withPage.WithPageMixed */
    {
      /**
       * Get page data
       * @returns {Object}
       */
      getPage() {
        return {
          number: this.get('pageNumber') || 1,
          size: this.get('pageSize') || 25,
        }
      },
    },
  )
})

module.exports = withPage
