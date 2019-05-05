/**
 * withBack mixin
 * @memberof module:@the-/mixin-scene
 * @function withBack
 * @param {function()} Class - Class to mix
 * @returns {function()} Mixed class
 */
/**
 * @memberof module:@the-/mixin-scene.withBack
 * @class WithBackMixed
 * @inner
 */
'use strict'

const asClassMixin = require('./helpers/asClassMixin')
const injectProperties = require('./helpers/injectProperties')

/**
 * @deprecated

 * @lends module:@the-/mixin-scene.withBack */
const withBack = asClassMixin((Class) => {
  injectProperties(
    Class,
    /** @lends module:@the-/mixin-scene.withBack~WithBackMixed */
    {
      /** Go Back */
      async goBack() {
        const url = this.get('back') || '/'
        await this.goTo(url)
      },
    },
  )
})

module.exports = withBack
