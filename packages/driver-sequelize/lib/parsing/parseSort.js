'use strict'

const parseAttributeName = require('./parseAttributeName')
const { MetaColumnNamesReversed } = require('../constants')
const { logger } = require('../helpers')

const SORT_DEST_PREFIX = /^-/

/**
 * @memberof module:@the-/driver-sequelize.parsing
 * @function parseSort
 * @param sort
 * @param options
 * @returns {*}
 */
function parseSort(sort, options) {
  const { ModelAttributes = {}, ModelName, resolveAssociation } = options
  return []
    .concat(sort)
    .filter(Boolean)
    .reduce((names, name) => names.concat(name.split(',')), [])
    .filter(Boolean)
    .map((name) => {
      const isDesc = SORT_DEST_PREFIX.test(name)
      const absName = name.replace(SORT_DEST_PREFIX, '')
      const normalizeName = parseAttributeName(absName)
      if (!normalizeName) {
        return null
      }

      const isNested = absName.includes('.')
      if (isNested) {
        const [as, subName] = absName.split('.')
        const association = resolveAssociation(as)
        if (!association) {
          logger.warn(`Unknown association "${as}" for ${ModelName}`)
          return null
        }

        return [
          association,
          parseAttributeName(subName),
          isDesc ? 'DESC' : 'ASC',
        ]
      }

      {
        const isKnown =
          normalizeName in ModelAttributes ||
          normalizeName in MetaColumnNamesReversed
        if (!isKnown) {
          logger.warn(`Unknown sort "${name}" for ${ModelName}`)
          return null
        }
      }

      return [normalizeName, isDesc ? 'DESC' : 'ASC']
    })
    .filter(Boolean)
}

parseSort.splitNested = () => {}

module.exports = parseSort
