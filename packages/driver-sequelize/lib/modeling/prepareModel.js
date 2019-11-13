'use strict'

const defineModelColumn = require('./defineModelColumn')
const MetaColumnNames = require('../constants/MetaColumnNames')
const parseAttributeName = require('../parsing/parseAttributeName')

/**
 * @memberof module:@the-/driver-sequelize.modeling
 * @function prepareModel
 * @param Model
 * @param Schema
 * @returns {Promise}
 */
async function prepareModel(Model, Schema) {
  const {
    sequelize: { queryInterface },
    tableName,
  } = Model
  await Model.sync()
  const descriptions = await queryInterface.describeTable(tableName)
  const specs = [
    ...Object.values(MetaColumnNames).map((attributeName) => [
      attributeName,
      Model.rawAttributes[attributeName],
    ]),
    ...Object.entries(Schema).map(([propertyName, def]) => {
      const attributeName = parseAttributeName(propertyName)
      const spec = defineModelColumn(propertyName, def)
      return [attributeName, spec]
    }),
  ]
  for (const [attributeName, spec] of specs) {
    const described = descriptions[attributeName]
    if (described) {
      const type = spec.type.toSql ? spec.type.toSql() : spec.type.key
      const changed =
        ['allowNull', 'primaryKey', 'unique'].some(
          (k) => described[k] !== spec[k],
        ) || type !== described.type
      if (changed) {
        await queryInterface.changeColumn(tableName, attributeName, spec)
      }
    } else {
      // New column
      await queryInterface.addColumn(tableName, attributeName, spec)
    }
  }
  await Model.sync()
}

module.exports = prepareModel
