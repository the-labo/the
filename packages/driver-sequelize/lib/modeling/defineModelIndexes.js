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
  const refColumnNames = Object.keys(schema).filter((key) => {
    const def = schema[key]
    return !def.noIndex && TypesToIndex.includes(def.type)
  })
  const indexColumnNames = Object.keys(schema)
    .filter((name) => schema[name].indexed)
    .sort((a, b) => {
      const pa = schema[a].indexPriority || 0
      const pb = schema[b].indexPriority || 0
      return pb - pa
    })
  return [
    ...refColumnNames.map((name) => ({
      fields: [name],
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
