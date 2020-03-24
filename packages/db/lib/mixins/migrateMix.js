'use strict'

const asleep = require('asleep')

/**
 * Add migrate methods
 * @memberof module:@the-/db
 * @function migrateMix
 * @param {function()}
 * @returns {function()}
 */
function migrateMix(Class) {
  /**
   * @memberof module:@the-/db
   * @inner
   */
  class MigrateMixed extends Class {
    /**
     * Run database migration
     * @param {Object<string, Function>} handlers - Migration handler for each versions
     * @returns {Promise<?Object>} Migration result
     */
    async migrate(handlers = {}) {
      const {
        resources: { TheDBSchema },
      } = this

      const schema = await TheDBSchema.current()

      if (schema.migratedAt) {
        console.warn(`[TheDB] Version "${schema.version}" is already migrated`)
        return null
      }

      const { version } = schema
      const handler = handlers[version]
      if (!handler) {
        console.warn(`[TheDB] No handler found for version "${schema.version}"`)
        return null
      }

      await handler(this, { schema })

      await asleep(10) // increment migratedAt
      await schema.update({ migratedAt: new Date() })

      const { version: newVersion } = await TheDBSchema.current()
      if (newVersion === version) {
        throw new Error(
          '[TheDB migration schema seems invalid. You should call `db.updateVersion(version)` after migration handling',
        )
      }

      return { from: version, to: newVersion }
    }

    async updateMigrationVersion(version) {
      const {
        resources: { TheDBSchema },
      } = this
      if (await TheDBSchema.exists({ version })) {
        throw new Error(`[TheDB] Version ${version} already exists!`)
      }

      const schema = await TheDBSchema.current()
      if (schema.version === version) {
        return false
      }

      await asleep(10) // increment createdAt
      await TheDBSchema.create({ createdAt: new Date(), version })
      return true
    }
  }

  return MigrateMixed
}

module.exports = migrateMix
