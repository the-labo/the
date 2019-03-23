/**
 * Parse schema
 * @function parseSchema
 * @param {Object} Schema
 * @param {Object} [options={}]
 */
'use strict'

const {
  DataTypes: { STRING },
} = require('@the-/resource')

/** @lends parseSchema */
function parseSchema(schema, options = {}) {
  const { indices = [] } = options
  return {
    ...indices.reduce(
      (reduced, indexName) => ({
        [indexName]: {
          description: `Index for ${indexName}`,
          maxLength: 512,
          type: STRING,
        },
        ...reduced,
      }),
      {},
    ),
    ...schema,
  }
}

module.exports = parseSchema
