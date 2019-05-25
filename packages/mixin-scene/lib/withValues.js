'use strict'
/**
 * withValues mixin
 * @memberof module:@the-/mixin-scene
 * @function withValues
 * @param {function()} Class - Class to mix
 * @returns {function()} Mixed class
 */
const asClassMixin = require('./helpers/asClassMixin')
const injectProperties = require('./helpers/injectProperties')

/** @lends module:@the-/mixin-scene.withValues */
const withValues = asClassMixin((Class) => {
  injectProperties(Class, {
    dropValues() {
      this.scope.values.drop()
    },
    setValues(v) {
      this.scope.values.set(v)
    },
  })
})

module.exports = withValues
