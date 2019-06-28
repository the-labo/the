'use strict'
/**
 * Define model column
 * @memberof module:@the-/driver-sequelize.modeling
 * @function defineModelColumn
 * @param {string} propertyName
 * @param {Object} def
 */
const {
  DataTypes: { BOOLEAN, DATE, ENTITY, ID, NULL, NUMBER, OBJECT, REF, STRING },
} = require('clay-constants')
const Sequelize = require('sequelize')

/** @lends module:@the-/driver-sequelize.modeling.defineModelColumn */
function defineModelColumn(propertyName, def = {}) {
  const { default: defaultValue, description, required, type } = def
  const base = {
    allowNull: !required,
    comment: description,
    defaultValue,
  }
  if (Array.isArray(type)) {
    throw new Error('[TheDriverSequelize] Multiple type is not supported')
  }
  switch (type) {
    case BOOLEAN:
      return { ...base, type: Sequelize.BOOLEAN }
    case DATE:
      return { ...base, type: Sequelize.DATE }
    case ENTITY:
    case REF:
      return { ...base, type: Sequelize.STRING }
    case ID:
      return { ...base, type: Sequelize.STRING }
    case NULL:
      return {
        ...base,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
        get: () => null,
      }
    case NUMBER:
      return { ...base, type: Sequelize.FLOAT }
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
