'use strict'

const MetaColumnNames = require('../constants/MetaColumnNames')
const { logger } = require('../helpers')
const serializer = require('../helpers/serializer')
const parseAttributeName = require('../parsing/parseAttributeName')

/**
 * @memberof module:@the-/driver-sequelize.converters
 * @function convertInbound
 * @param values
 * @param [options={}]
 * @returns {*}
 */
function convertInbound(values, options = {}) {
  const {
    ModelAttributes = {},
    ModelName,
    Schema,
    enableLegacyEncoding,
  } = options
  const converted = {
    [MetaColumnNames.$$at]: values.$$at || new Date(),
  }
  for (const [propertyName, v] of Object.entries(values)) {
    if (propertyName in MetaColumnNames) {
      continue
    }

    const attributeName = parseAttributeName(propertyName)
    const isMeta = /^\$\$/.test(propertyName)
    if (isMeta) {
      continue
    }

    const isKnown = attributeName in ModelAttributes
    if (!isKnown) {
      logger.warn(
        `[inbound] Skip unknown attribute "${propertyName}" for ${ModelName}`,
      )
      continue
    }

    converted[attributeName] = serializer.serialize(v, {
      enableLegacyEncoding,
      schema: Schema[propertyName],
    })
  }
  return converted
}

module.exports = convertInbound
