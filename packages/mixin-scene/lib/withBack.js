/**
 * withBack mixin
 * @function withBack
 * @param {function} Class - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

const asClassMixin = require('./helpers/asClassMixin')
const injectProperties = require('./helpers/injectProperties')

/** @lends withBack */
const withBack = asClassMixin((Class) => {
  injectProperties(Class, {
    /** Go Back */
    async goBack() {
      const url = this.get('back') || '/'
      await this.goTo(url)
    },
  })
})

module.exports = withBack
