/**
 * @function parseFilter
 */
'use strict'

const {
  DataTypes: { OBJECT },
} = require('clay-constants')
const { typeOf } = require('clay-serial')
const { Op } = require('sequelize')
const parseAttributeName = require('./parseAttributeName')
const logger = require('../helpers/logger')
const serializer = require('../helpers/serializer')

const INVALID_FILTER_CONDITION_ID = '____theInvalidFilterConditionID'

/** @lends parseFilter */
function parseFilter(filter, options = {}) {
  if (!filter) {
    return filter
  }
  const { ModelAttributes = {}, ModelName, Schema } = options
  if (Array.isArray(filter)) {
    return { [Op.or]: filter.map((filter) => parseFilter(filter, options)) }
  }
  if (filter.$or) {
    const { $or, ...rest } = filter
    const orArray = $or.map((or) => ({ ...rest, ...or }))
    return parseFilter(orArray, options)
  }
  if (filter.$and) {
    const { $and, ...rest } = filter
    const andArray = $and.map((and) => ({ ...and, ...rest }))
    return parseFilter(Object.assign({}, ...andArray), options)
  }
  const parsed = {}
  for (const propertyName of Object.keys(filter)) {
    const value = Array.isArray(filter[propertyName])
      ? { $or: filter[propertyName] }
      : filter[propertyName]
    const type = typeOf(value)
    const isKnown = parseAttributeName(propertyName) in ModelAttributes
    if (!isKnown) {
      logger.warn(`Unknown filter "${propertyName}" for ${ModelName}`)
      parsed.id = INVALID_FILTER_CONDITION_ID
      continue
    }
    switch (type) {
      case OBJECT: {
        const subNames = Object.keys(value)
        for (const subName of subNames) {
          const subValue = value[subName]
          const isOperator = /^\$/.test(subName)
          if (isOperator) {
            const operator = Op[subName.replace(/^\$/, '')] || subName
            parsed[parseAttributeName(propertyName)] = {
              ...(parsed[parseAttributeName(propertyName)] || {}),
              [operator]: subValue,
            }
          }
        }
        break
      }
      default: {
        parsed[parseAttributeName(propertyName)] = serializer.serialize(value, {
          schema: Schema[propertyName],
        })
        break
      }
    }
  }
  return parsed
}

module.exports = parseFilter
