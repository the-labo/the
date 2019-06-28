'use strict'
/**
 * Resource to manage schema
 * @memberof module:@the-/db
 * @class TheSchemaResource
 */
const {
  DataTypes: { DATE, STRING },
  TheResource,
} = require('@the-/resource')

/** @lends module:@the-/db.TheSchemaResource */
class TheSchemaResource extends TheResource {
  static get policy() {
    return {
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
