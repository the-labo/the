'use strict'

const {
  DataTypes: { BOOLEAN, DATE, ENTITY, ID, NULL, NUMBER, OBJECT, REF, STRING },
} = require('clay-constants')

const TypesToIndex = [
  ENTITY,
  ID,
  REF,
]

/**
 * Define model indexes
 * @memberof module:@the-/driver-sequelize.modeling
 * @function defineModelIndexes
 * @param schema
 * @returns {string[]}
 */
function defineModelIndexes (schema) {
  const refColumnNames = Object.keys(schema)
    .filter((key) => TypesToIndex.includes(schema[key].type))
  return [
    ...refColumnNames.map((name) => ({
      fields: [name],
    })),
  ]
}

module.exports = defineModelIndexes
