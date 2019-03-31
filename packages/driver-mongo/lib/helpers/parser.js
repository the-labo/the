'use strict'

const { escape, unescape } = require('mongo-escape')
const SORT_DEST_PREFIX = /^-/

function parseSort(sort) {
  return []
    .concat(sort)
    .filter(Boolean)
    .reduce((names, name) => names.concat(name.split(',')), [])
    .filter(Boolean)
    .reduce((formatted, name) => {
      const isDesc = SORT_DEST_PREFIX.test(name)
      const _name = name.replace(/^-/, '')
      return { ...formatted, [_name]: isDesc ? -1 : 1 }
    }, {})
}

function parseInboundAttributes(attributes) {
  return escape({ ...attributes }, true)
}

function parseOutboundAttributes(attributes) {
  return unescape({ ...attributes }, true)
}

function parseFilter(filter) {
  if (!filter) {
    return filter
  }
  if (Array.isArray(filter)) {
    return { $or: filter.map((f) => parseFilter(f)) }
  }
  const parsed = {}
  for (const [k, v] of Object.entries(filter)) {
    parsed[k] = parseFilterValue(v)
  }
  return parsed
}

function parseFilterValue(v) {
  if (Array.isArray(v)) {
    return { $in: v.map((v) => parseFilterValue(v)) }
  }
  switch (typeof v) {
    case 'object': {
      if (v && v.$ref) {
        return { [escape('$ref')]: v.$ref }
      } else {
        return v
      }
    }
    default:
      return v
  }
}

module.exports = {
  parseFilter,
  parseInboundAttributes,
  parseOutboundAttributes,
  parseSort,
}
