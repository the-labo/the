'use strict'

const clayId = require('clay-id')
const Sequelize = require('sequelize')
const defineModelColumn = require('./defineModelColumn')
const defineModelIndexes = require('./defineModelIndexes')
const MetaColumnNames = require('../constants/MetaColumnNames')
const parseAttributeName = require('../parsing/parseAttributeName')

/**
 * Parse schema
 * @memberof module:@the-/driver-sequelize.modeling
 * @function defineModel
 * @param {Object} sequelize
 * @param {string} resourceName
 * @param {Object} schema
 * @param {Object} [options={}]
 * @returns {Object}
 */
function defineModel(sequelize, resourceName, schema, options = {}) {
  const { indices = [] } = options
  const attributes = {
    [MetaColumnNames.$$at]: {
      allowNull: false,
      comment: 'Updated date',
      defaultValue: () => new Date(),
      type: Sequelize.DATE(3),
    },
    [MetaColumnNames.$$num]: {
      allowNull: false,
      comment: 'Version number',
      defaultValue: () => 0,
      type: Sequelize.INTEGER,
      unique: false,
    },
    id: {
      allowNull: false,
      comment: 'Clay ID',
      defaultValue: () => String(clayId()),
      primaryKey: true,
      type: Sequelize.STRING(64),
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
      ...(indices || []).map((index) => {
        if (typeof index === 'string') {
          return { fields: [index] }
        }
        if (Array.isArray(index)) {
          return { fields: index }
        }
        return index
      }),
      ...defineModelIndexes(schema),
    ].filter(Boolean),
    timestamps: false,
    updatedAt: false,
  })
}

module.exports = defineModel
