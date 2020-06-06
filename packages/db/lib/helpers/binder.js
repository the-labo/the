'use strict'

const { unlessProduction } = require('@the-/check-env')

const noop = (v) => v

const asBound = (bound = noop) => async (resource, array, actionContext) =>
  Promise.all(
    array.map((entry) => {
      const result = bound.call(resource, entry, actionContext)
      unlessProduction(() => {
        if (typeof result === 'undefined') {
          throw new Error(
            `[TheDB][${resource.resourceName}] Failed to bound. May be you forgot to return value on inbound() / outbound()`,
          )
        }
      })
      return result
    }),
  )

/**
 * @memberof module:@the-/db.helpers
 * @namespace binder
 */
module.exports = {
  asBound,
}
