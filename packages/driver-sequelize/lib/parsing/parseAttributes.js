'use strict'

const MetaColumnNames = require('../constants/MetaColumnNames')

function parseAttributes(attreibutes) {
  if (!attreibutes) {
    return attreibutes
  }
  return [...attreibutes, ...Object.values(MetaColumnNames)]
}
module.exports = parseAttributes
