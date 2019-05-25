'use strict'
/**
 * Wrap controller with debug
 * @function withDebug
 * @param {function()} Base class
 * @returns {function()} Mixed class
 */
const { cleanup } = require('asobj')
const Debug = require('debug')
const { inspect } = require('util')
const { unlessProduction } = require('@the-/check')
const {
  getAllPropertyDescriptors,
  instanceMethodNamesFor,
  omitLongString,
} = require('./helpers')

/** @lends withDebug */
function withDebug(Class, options = {}) {
  class WithDebug extends Class {
    constructor(...args) {
      super(...args)
      unlessProduction(() => {
        const Constructor = this.constructor
        const controllerName = this.name || Constructor.name
        const {
          contextFilter = ({ client }) => client,
          debugKey = `app:${controllerName}`,
        } = options
        const debug = Debug(debugKey)

        const descriptors = getAllPropertyDescriptors(this)
        const instanceMethodNames = instanceMethodNamesFor(this, descriptors)

        this._debug = debug
        for (const name of instanceMethodNames) {
          const original = this[name]
          this[name] = Object.assign(
            async function debugProxy(...args) {
              const startAt = new Date()
              let result
              let exception
              try {
                result = await original.apply(this, args)
              } catch (e) {
                debug('exception', e)
                exception = e
                throw e
              } finally {
                const took = new Date() - startAt
                const context = contextFilter(this)
                const info = omitLongString({
                  args,
                  context,
                  exception,
                  result,
                  took,
                })
                debug(
                  `\`${controllerName}.${name}()\``,
                  inspect(cleanup(info), {
                    breakLength: Infinity,
                    depth: 3,
                    maxArrayLength: 3,
                  }),
                )
              }
              return result
            },
            { original },
          )
        }
      })
      this._debug = () => null
    }
  }

  return WithDebug
}

module.exports = withDebug
