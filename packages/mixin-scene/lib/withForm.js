/**
 * withForm mixin
 * @deprecated
 * @memberOf module:@the-/mixin-scene
 * @function withForm
 * @param {function} Class - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

const { get } = require('bwindow')
const asClassMixin = require('./helpers/asClassMixin')
const injectProperties = require('./helpers/injectProperties')

/** @lends module:@the-/mixin-scene.withForm */
const withForm = asClassMixin((Class) => {
  injectProperties(Class, {
    _createFormData(values) {
      const FormData = get('FormData')
      const form = new FormData()
      for (const [k, v] of Object.entries(values)) {
        form.append(k, v)
      }
      return form
    },
    async postForm(url, values) {
      return this.sendForm(url, values, { method: 'post' })
    },
    async sendForm(url, values, options = {}) {
      const { method = 'post' } = options
      const body = this._createFormData(values)
      const response = await window.fetch(url, {
        body,
        method,
      })
      return response.json()
    },
  })
})

module.exports = withForm
