/**
 * Parse schema
 * @memberof module:@the-/db.helpers
 * @function parseSchema
 * @param {Object} Schema
 * @param {Object} [options={}]
 */
'use strict'

const {
  DataTypes: { STRING },
} = require('@the-/resource')

/** @lends module:@the-/db.helpers.parseSchema */
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
