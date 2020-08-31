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
  try {
    await Model.sync()
  } catch (e) {
    // カラムとindexが同時に追加された時などに落ちることがある
    console.warn(`[@the-/db][${tableName}] Failed to sync`, e)
  }
  let descriptions = await queryInterface.describeTable(tableName)
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
        descriptions = await queryInterface.describeTable(tableName)
      }
    } else {
      // New column
      await queryInterface.addColumn(tableName, attributeName, spec)
      descriptions = await queryInterface.describeTable(tableName)
    }
  }

  await Model.sync()

  {
    const indexes = await queryInterface.showIndex(tableName)
    const known = ['PRIMARY', 'id', ...Model.options.indexes.map((i) => i.name)]
    const unknown = indexes
      .filter((i) => !i.primary && !i.unique)
      .map((i) => i.name)
      .filter((n) => !known.includes(n))
    for (const indexName of unknown) {
      console.warn(
        `[TheDB] Remove unknown index "${indexName}" on ${tableName}`,
      )
      await queryInterface.removeIndex(tableName, indexName)
    }
  }
}

module.exports = prepareModel
