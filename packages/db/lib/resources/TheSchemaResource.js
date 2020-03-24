'use strict'

const {
  DataTypes: { DATE, STRING },
} = require('@the-/resource')

/**
 * Resource to manage schema
 * @memberof module:@the-/db
 * @class TheSchemaResource
 */
const TheSchemaResource = ({ define }) => {
  const TheSchema = define({
    createdAt: {
      default: () => new Date(),
      description: 'Date schema created at',
      required: true,
      type: DATE,
    },
    migratedAt: {
      description: 'Date migrated',
      type: DATE,
    },
    version: {
      default: () => 'none',
      description: 'Schema version string',
      required: true,
      type: STRING,
      unique: true,
    },
  })
  Object.assign(TheSchema, {
    async current() {
      const latest = await TheSchema.first({}, { sort: ['-createdAt'] })
      if (latest) {
        if (!latest.migratedAt) {
          return latest
        }
      }
      const skipped = await TheSchema.first(
        { migratedAt: null },
        { sort: ['-createdAt'] },
      )
      if (skipped) {
        return skipped
      }
      return TheSchema.create({})
    },
  })
  return TheSchema
}

module.exports = TheSchemaResource
