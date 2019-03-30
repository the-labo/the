/**
 * withReady mixin
 * @function withReady
 * @param {function} Class - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

const asClassMixin = require('./helpers/asClassMixin')
const asMethodWrap = require('./helpers/asMethodWrap')
const injectProperties = require('./helpers/injectProperties')

/** @lends withReady */
const withReady = asClassMixin((Class) => {
  injectProperties(Class, {
    /**
     * Do only if ready
     * @param {function} task
     * @returns {Promise<*>}
     */
    async ifReady(task) {
      if (this.isReady) {
        return await task()
      }
    },
    /**
     * Get is ready or not
     * @property {Boolean} isReady
     */
    isReady: {
      get() {
        return this.get('ready')
      },
    },
    /**
     * Set ready when done
     * @param {function} task
     * @returns {Promise<*>}
     */
    async readyWhen(task) {
      try {
        return await task()
      } finally {
        this.set({ ready: true })
      }
    },
    /**
     * Do unless ready
     * @param {function} task
     * @returns {Promise<*>}
     */
    async unlessReady(task) {
      if (!this.isReady) {
        return await task()
      }
    },
  })
})

module.exports = Object.assign(
  withReady,
  /** @lends withReady */
  {
    when: asMethodWrap((method) => {
      return async function readyWhenWrap(...args) {
        return this.readyWhen(async () => method.apply(this, args))
      }
    }),
  },
)
