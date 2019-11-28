'use strict'

const { refTo } = require('clay-resource-ref')
const { unlessProduction } = require('@the-/check-env')

/**
 * Convert into ref
 * @memberof module:@the-/util-site
 * @function refOf
 * @param entity
 * @returns {*}
 */
function refOf(entity) {
  if (!entity) {
    return null
  }

  unlessProduction(() => {
    if (!entity.$$as) {
      console.warn('Invalid entity:', entity)
    }
  })
  return refTo(entity.$$as, entity.id)
}

module.exports = refOf
