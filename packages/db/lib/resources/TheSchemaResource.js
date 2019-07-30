'use strict'
/**
 * Resource to manage schema
 * @memberof module:@the-/db
 * @class TheSchemaResource
 */
const {
  DataTypes: { DATE, STRING },
} = require('@the-/resource')

/** @lends module:@the-/db.TheSchemaResource */
const TheSchemaResource = ({ define }) => {
  const TheSchema = define({
    createdAt: {
      description: 'Date schema created at',
      required: true,
      type: DATE,
      default: () => new Date(),
    },
    migratedAt: {
      description: 'Date migrated',
      type: DATE,
    },
    version: {
      description: 'Schema version string',
      required: true,
      type: STRING,
      unique: true,
      default: () => 'none',
    },
  })
  Object.assign(TheSchema, {
    async current() {
      const latest = await TheSchema.first(
        {},
        { sort: ['-createdAt', '-$$num'] },
      )
      if (latest) {
        return latest
      }
      return TheSchema.create({})
    },
  })
  return TheSchema
}

module.exports = TheSchemaResource
