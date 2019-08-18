'use strict'

/**
 * @memberof module:@the-/mixin-scene.withPage
 * @class WithPageMixed
 * @inner
 */
const asClassMixin = require('./helpers/asClassMixin')
const injectProperties = require('./helpers/injectProperties')

/**
 * withPage mixin
 * @memberof module:@the-/mixin-scene
 * @function withPage
 * @param {function()} Class - Class to mix
 * @returns {function()} Mixed class
 */
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
