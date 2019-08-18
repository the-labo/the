'use strict'

const clayId = require('clay-id')
const Sequelize = require('sequelize')
const defineModelColumn = require('./defineModelColumn')
const MetaColumnNames = require('../constants/MetaColumnNames')
const parseAttributeName = require('../parsing/parseAttributeName')

/**
 * Parse schema
 * @memberof module:@the-/driver-sequelize.modeling
 * @function defineModel
 * @param {Object}
 * @returns {Object}
 */
function defineModel(sequelize, resourceName, schema) {
  const attributes = {
    [MetaColumnNames.$$at]: {
      comment: 'Updated date',
      defaultValue: () => new Date(),
      required: true,
      type: Sequelize.DATE,
    },
    [MetaColumnNames.$$num]: {
      autoIncrement: true,
      comment: 'Version number',
      defaultValue: () => 0,
      required: true,
      type: Sequelize.INTEGER,
      unique: true,
    },
    id: {
      allowNull: false,
      comment: 'Clay ID',
      defaultValue: () => String(clayId()),
      primaryKey: true,
      required: true,
      type: Sequelize.STRING,
      unique: true,
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
