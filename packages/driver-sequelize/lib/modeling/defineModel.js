'use strict'
/**
 * Parse schema
 * @memberof module:@the-/driver-sequelize.modeling
 * @function defineModel
 * @param {Object}
 * @returns {Object}
 */
const clayId = require('clay-id')
const Sequelize = require('sequelize')
const defineModelColumn = require('./defineModelColumn')
const MetaColumnNames = require('../constants/MetaColumnNames')
const parseAttributeName = require('../parsing/parseAttributeName')

/** @lends module:@the-/driver-sequelize.modeling.defineModel */
function defineModel(sequelize, resourceName, schema) {
  const attributes = {
    [MetaColumnNames.$$at]: {
      comment: 'Updated date',
      required: true,
      type: Sequelize.DATE,
      defaultValue: () => new Date(),
    },
    [MetaColumnNames.$$num]: {
      autoIncrement: true,
      comment: 'Version number',
      required: true,
      type: Sequelize.INTEGER,
      unique: true,
      defaultValue: () => 0,
    },
    id: {
      allowNull: false,
      comment: 'Clay ID',
      primaryKey: true,
      required: true,
      type: Sequelize.STRING,
      unique: true,
      defaultValue: () => String(clayId()),
    },
    ...Object.entries(schema).reduce(
      (columns, [propertyName, def]) => ({
        ...columns,
        [parseAttributeName(propertyName)]: defineModelColumn(
          propertyName,
          def,
        ),
      }),
      {},
    ),
  }
  return sequelize.define(resourceName, attributes, {
    createdAt: false,
    freezeTableName: true,
    indexes: [
      // TODO Needs index?
    ],
    timestamps: false,
    updatedAt: false,
  })
}

module.exports = defineModel
