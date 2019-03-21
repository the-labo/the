/**
 * Convert into ref
 * @function refOf
 */
'use strict'

const { refTo } = require('clay-resource-ref')
const { unlessProduction } = require('@the-/check')

/** @lends refOf */
function refOf(entity) {
  if (!entity) {
    return null
  }
  unlessProduction(() => {
    if (!entity.$$as) {
      console.warn(`Invalid entity:`, entity)
    }
  })
  return refTo(entity.$$as, entity.id)
}

module.exports = refOf
