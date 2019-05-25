'use strict'
/**
 * @memberof module:@the-/driver-sequelize.modeling
 * @function prepareModel
 * @returns {Promise}
 */
const defineModelColumn = require('./defineModelColumn')
const parseAttributeName = require('../parsing/parseAttributeName')

/** @lends module:@the-/driver-sequelize.modeling.prepareModel */
async function prepareModel(Model, Schema) {
  const {
    sequelize: { queryInterface },
    tableName,
  } = Model
  await Model.sync()
  const descriptions = await queryInterface.describeTable(tableName)
  for (const [propertyName, def] of Object.entries(Schema)) {
    const attributeName = parseAttributeName(propertyName)
    const defined = defineModelColumn(propertyName, def)
    const described = descriptions[attributeName]
    if (described) {
      const type = defined.type.toSql ? defined.type.toSql() : defined.type.key
      const changed =
        ['allowNull', 'primaryKey', 'unique'].some(
          (k) => described[k] !== defined[k],
        ) || type !== described.type
      if (changed) {
        await queryInterface.changeColumn(tableName, attributeName, defined)
      }
    } else {
      // New column
      await queryInterface.addColumn(tableName, attributeName, defined)
    }
  }
  await Model.sync()
}

module.exports = prepareModel
