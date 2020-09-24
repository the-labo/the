'use strict'

const {
  DataTypes: { ENTITY, ID, OBJECT, REF, STRING },
} = require('clay-constants')
const { refTo } = require('clay-resource-ref')
const { typeOf } = require('clay-serial')
const utf8 = require('utf8')

const isEmpty = (v) => v === null || typeof v === 'undefined'

exports.serialize = (value, options = {}) => {
  const { enableLegacyEncoding = false, schema = {} } = options
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

      if (enableLegacyEncoding) {
        return utf8.encode(String(value))
      } else {
        return String(value)
      }
    }
    default: {
      return value
    }
  }
}

exports.deserialize = (value, type, options = {}) => {
  const isMultiple = type !== OBJECT && Array.isArray(value)
  if (isMultiple) {
    return value.map((value) => exports.serialize(value, type))
  }

  const { enableLegacyEncoding = false } = options

  switch (type) {
    case ENTITY:
    case REF: {
      return isEmpty(value) ? null : { $ref: value }
    }
    case ID: {
      return String(value)
    }
    case STRING:
      if (enableLegacyEncoding) {
        return isEmpty(value) ? null : utf8.decode(String(value))
      } else {
        return isEmpty(value) ? null : String(value)
      }
    default:
      return value
  }
}
