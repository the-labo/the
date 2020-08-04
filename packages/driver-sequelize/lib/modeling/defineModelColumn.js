'use strict'

const {
  DataTypes: { BOOLEAN, DATE, ENTITY, ID, NULL, NUMBER, OBJECT, REF, STRING },
} = require('clay-constants')
const Sequelize = require('sequelize')

/**
 * Define model column
 * @memberof module:@the-/driver-sequelize.modeling
 * @function defineModelColumn
 * @param {Object} def
 * @param {string} propertyName
 * @returns {*}
 */
function defineModelColumn(propertyName, def = {}) {
  const {
    big,
    default: defaultValue,
    description,
    precise,
    required,
    type,
  } = def
  const base = {
    allowNull: !required,
    comment: description,
    defaultValue,
  }
  if (Array.isArray(type)) {
    throw new Error(
      `[TheDriverSequelize][${propertyName} Multiple type is not supported: ${JSON.stringify(
        type,
      )}`,
    )
  }

  switch (type) {
    case BOOLEAN:
      return { ...base, type: Sequelize.BOOLEAN }
    case DATE:
      return { ...base, type: Sequelize.DATE(3) }
    case ENTITY:
    case REF:
      return { ...base, type: Sequelize.STRING(128) }
    case ID:
      return { ...base, type: Sequelize.STRING(64) }
    case NULL:
      return {
        ...base,
        defaultValue: false,
        get: () => null,
        type: Sequelize.BOOLEAN,
      }
    case NUMBER: {
      let { FLOAT: sType } = Sequelize
      if (precise) {
        sType = Sequelize.DOUBLE
      } else if (big) {
        sType = Sequelize.BIGINT
      }

      return { ...base, type: sType }
    }
    case OBJECT:
      return { ...base, type: Sequelize.JSON }
    case STRING: {
      const { maxLength = 512 } = def
      return { ...base, type: Sequelize.STRING(maxLength) }
    }
    default:
      throw new Error(
        `[TheDriverSequelize] Unknown type: ${type} (for ${propertyName})`,
      )
  }
}

module.exports = defineModelColumn
