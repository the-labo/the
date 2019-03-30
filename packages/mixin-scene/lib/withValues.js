/**
 * withValues mixin
 * @function withValues
 * @param {function} Class - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

const asClassMixin = require('./helpers/asClassMixin')
const injectProperties = require('./helpers/injectProperties')

/** @lends withValues */
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
