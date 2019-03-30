/**
 * withFailure mixin
 * @function withFailure
 * @param {function} Class - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

const asClassMixin = require('./helpers/asClassMixin')
const asMethodWrap = require('./helpers/asMethodWrap')
const injectProperties = require('./helpers/injectProperties')

/** @lends withFailure */
const withFailure = asClassMixin((Class) => {
  injectProperties(Class, {
    async catchFailure(e, options = {}) {
      const { messages = {} } = options
      const message = messages[e.name] || messages.default
      if (message) {
        this.setFailure(String(message))
      } else {
        return Promise.reject(e)
      }
    },
    clearFailure() {
      this.init('failure')
    },
    setFailure(failure) {
      this.set({ failure })
    },
  })
})

module.exports = Object.assign(withFailure, {
  for(handler) {
    return asMethodWrap((method) => {
      return async function failureCatch(...args) {
        this.clearFailure()
        return Promise.resolve(method.apply(this, args)).catch((e) =>
          this.catchFailure(e, { messages: handler(this) }),
        )
      }
    })
  },
})
