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
function defineModelIndexes(schema) {
  const refColumnNames = Object.keys(schema)
    .filter((key) => {
      const def = schema[key]
      return !def.noIndex && TypesToIndex.includes(def.type)
    })
    .filter(Boolean)
    .map((name) => {
      const { indexedWith } = schema[name] || {}
      if (indexedWith) {
        return [name].concat(indexedWith)
      }

      return name
    })
  const indexColumnNames = Object.keys(schema)
    .filter((name) => {
      const def = schema[name]
      const skip = TypesToIndex.includes(def.type)
      if (skip) {
        return false
      }

      return def.indexed
    })
    .sort((a, b) => {
      const pa = schema[a].indexPriority || 0
      const pb = schema[b].indexPriority || 0
      return pb - pa
    })
  return [
    ...refColumnNames.map((name) => ({
      fields: [].concat(name),
    })),
    ...(indexColumnNames.length > 0
      ? [
          {
            fields: indexColumnNames,
          },
        ]
      : []),
  ]
}

module.exports = defineModelIndexes
