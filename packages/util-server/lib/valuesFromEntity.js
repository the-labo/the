'use strict'
/**
 * Get values from entity
 * @function valuesFromEntity
 * @param {Object}
 * @returns {Object}
 */
const META_FIELD_PREFIX = /^\$/

/** @lends valuesFromEntity */
function valuesFromEntity(entity) {
  if (!entity) {
    return null
  }

  return Object.assign(
    {},
    ...Object.entries(entity)
      .filter(([k]) => !META_FIELD_PREFIX.test(k)) // Remove meta fields
      .map(([k, v]) => ({ [k]: v })),
  )
}

module.exports = valuesFromEntity
