'use strict'

const { unlessProduction } = require('@the-/check-env')

const noop = (v) => v
const get = (obj, namepath) => {
  if (!obj) {
    return obj
  }

  const [name, ...remain] = namepath.split('.')
  const value = obj[name]
  if (remain.length > 0) {
    return get(value, remain.join('.'))
  } else {
    return value
  }
}

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
