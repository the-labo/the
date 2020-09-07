'use strict'

const clayEntity = require('clay-entity')
const { MetaColumnNames } = require('../constants')
const { logger } = require('../helpers')
const serializer = require('../helpers/serializer')
const parseAttributeName = require('../parsing/parseAttributeName')

/**
 * @memberof module:@the-/driver-sequelize.converters
 * @function convertOutbound
 * @param values
 * @param [options={}]
 * @returns {*}
 */
function convertOutbound(values, options = {}) {
  const { ModelName, Schema, resourceName, associated=[], outbound } = options
  const converted = {
    $$as: resourceName,
    $$at: values[MetaColumnNames.$$at],
    $$num: values[MetaColumnNames.$$num],
    id: values.id,
  }
  for (const [attributeName, v] of Object.entries(values)) {
    if (/^__/.test(attributeName)) {
      continue
    }

    const name = parseAttributeName.restore(attributeName)
    if (name === 'id') {
      continue
    }

    if(associated.includes(name)){
      converted[name] = outbound(v)
      continue
    }

    const def = Schema[name]
    const isKnown = !!def
    if (!isKnown) {
      logger.warn(
        `[outbound] Skip unknown attribute "${name}" for ${ModelName}`,
      )
      continue
    }

    converted[name] = serializer.deserialize(v, def.type)
  }
  return clayEntity(converted)
}

module.exports = convertOutbound
