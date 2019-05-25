'use strict'
/**
 * @function withDebug
 * @param {function()} Base class
 * @returns {function()} Mixed class
 */
const Debug = require('debug')
const { unlessProduction } = require('@the-/check')

/** @lends withDebug */
function withDebug(Class) {
  const methodNamesToDebug = ['open', 'flush', 'close', 'abort']

  class WithDebug extends Class {
    constructor(...args) {
      super(...args)
      unlessProduction(() => {
        const Constructor = this.constructor
        const streamName = this.name || Constructor.name
        const debugKey = `app:${streamName}`
        const debug = Debug(debugKey)
        this._debug = debug
        for (const methodName of methodNamesToDebug) {
          const method = this[methodName]
          this[methodName] = Object.assign(async function debugProxy(...args) {
            debug(methodName)
            return method.apply(this, args)
          })
        }
      })
    }
  }

  return WithDebug
}

module.exports = withDebug
