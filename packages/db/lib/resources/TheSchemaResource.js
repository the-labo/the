'use strict'
/**
 * Resource to manage schema
 * @memberof module:@the-/db
 * @class TheSchemaResource
 */
const { DataTypes, TheResource } = require('@the-/resource')

const { DATE, STRING } = DataTypes

/** @lends module:@the-/db.TheSchemaResource */
class TheSchemaResource extends TheResource {
  static get policy() {
    return {
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
    }
  }

  static get schema() {
    return this.policy
  }

  async current() {
    const Schema = this
    const latest = await Schema.first({}, { sort: ['-createdAt'] })
    if (latest) {
      return latest
    }
    return Schema.create({})
  }
}

module.exports = TheSchemaResource
