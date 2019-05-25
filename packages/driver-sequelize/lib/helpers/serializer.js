'use strict'
const { DataTypes } = require('clay-constants')
const { refTo } = require('clay-resource-ref')
const { typeOf } = require('clay-serial')
const utf8 = require('utf8')
const { ENTITY, ID, OBJECT, REF, STRING } = DataTypes
const isEmpty = (v) => v === null || typeof v === 'undefined'

exports.serialize = (value, options = {}) => {
  const { schema = {} } = options
  const type = typeOf(value)
  const isMultiple = type !== OBJECT && Array.isArray(value)
  if (isMultiple) {
    return value.map((value) => exports.serialize(value, type))
  }
  switch (type) {
    case ENTITY: {
      return refTo(value.$$as, value.id)
    }
    case ID: {
      return String(value)
    }
    case REF: {
      return value.$ref
    }
    case STRING: {
      if (isEmpty(value)) {
        return null
      }
      const { maxLength } = schema
      if (maxLength) {
        // auto truncate long data
        value = String(value).slice(0, maxLength)
      }
      return utf8.encode(String(value))
    }
    default: {
      return value
    }
  }
}

exports.deserialize = (value, type) => {
  const isMultiple = type !== OBJECT && Array.isArray(value)
  if (isMultiple) {
    return value.map((value) => exports.serialize(value, type))
  }
  switch (type) {
    case ENTITY:
    case REF: {
      return isEmpty(value) ? null : { $ref: value }
    }
    case ID: {
      return String(value)
    }
    case STRING:
      return isEmpty(value) ? null : utf8.decode(String(value))
    default:
      return value
  }
}
