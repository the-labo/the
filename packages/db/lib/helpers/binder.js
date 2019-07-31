'use strict'

/**
 * @memberof module:@the-/db.helpers
 * @namespace binder
 */
const { unlessProduction } = require('@the-/check')

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

const indexBounds = (indices = []) => ({
  indexInbound: asBound((attributes) => {
    for (const name of indices) {
      attributes[name] = get(attributes, name)
    }
    return attributes
  }),
  indexOutbound: asBound((entity, actionContext) => {
    for (const name of indices) {
      if (!(name in entity)) {
        continue
      }
      const value = get(entity, name)
      const rotten = actionContext.action !== 'one' && entity[name] !== value
      if (rotten) {
        unlessProduction(() => {
          console.warn(
            `[TheDB] Index had rotten on "${name}" for "${entity.$$as}#${entity.id}"`,
            {
              actual: value,
              indexed: entity[name],
            },
          )
        })
      }
      const needsDelete = /\./.test(name)
      if (needsDelete) {
        delete entity[name]
      }
    }
    return entity
  }),
})

/** @lends module:@the-/db.helpers.binder */
module.exports = {
  asBound,
  indexBounds,
}
