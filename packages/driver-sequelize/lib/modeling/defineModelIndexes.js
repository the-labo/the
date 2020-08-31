'use strict'

const {
  DataTypes: { ENTITY, ID, REF },
} = require('clay-constants')

const TypesToIndex = [ENTITY, ID, REF]

/**
 * Define model indexes
 * @memberof module:@the-/driver-sequelize.modeling
 * @function defineModelIndexes
 * @param schema
 * @returns {string[]}
 */
function defineModelIndexes(schema, options = {}) {
  const { indices } = options
  const refColumnNames = Object.keys(schema)
    .filter((key) => {
      const def = schema[key]
      return !def.noIndex && TypesToIndex.includes(def.type)
    })
    .filter(Boolean)
    .map((name) => {
      const def = schema[name] || {}
      return [].concat(name).concat(def.indexedWith).filter(Boolean)
    })
  const indexedNames = Object.keys(schema)
    .map((name) => {
      const def = schema[name] || {}
      const skip = TypesToIndex.includes(def.type)
      if (skip) {
        return null
      }
      if (!def.indexed) {
        return null
      }
      return [].concat(name).concat(def.indexedWith).filter(Boolean)
    })
    .filter(Boolean)
  return [
    ...refColumnNames.map((name) => ({
      fields: [].concat(name),
    })),
    ...indexedNames.map((name) => ({
      fields: [].concat(name),
    })),
    ...(indices || []).map((index) => {
      if (typeof index === 'string') {
        return { fields: [index] }
      }

      if (Array.isArray(index)) {
        return { fields: index }
      }

      return index
    }),
  ].filter(Boolean)
}

module.exports = defineModelIndexes
