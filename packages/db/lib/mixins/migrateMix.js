'use strict'
/**
 * Add migrate methods
 * @memberof module:@the-/db
 * @function migrateMix
 * @param {function()}
 * @returns {function()}
 */
/** @lends module:@the-/db.migrateMix */
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
      const { TheDBSchema } = this.resources

      const schema = await TheDBSchema.current()

      if (schema.migratedAt) {
        return null
      }

      const { version } = schema
      const handler = handlers[version]
      if (!handler) {
        return null
      }
      await handler(this, { schema })

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
      const { TheDBSchema } = this.resources
      if (await TheDBSchema.exists({ version })) {
        throw new Error(`Version ${version} already exists!`)
      }
      const schema = await TheDBSchema.current()
      if (schema.version === version) {
        return false
      }
      await TheDBSchema.create({ version })
      return true
    }
  }

  return MigrateMixed
}

module.exports = migrateMix
