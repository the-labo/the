/**
 * Mixin of sequelize
 * @memberOf module:@the-/driver-sequelize.mixins
 * @function sequelizeMix
 */
'use strict'

const Sequelize = require('sequelize')

/** @lends module:@the-/driver-sequelize.mixins.sequelizeMix */
function sequelizeMix(Class) {
  class SequelizeMixed extends Class {
    createSequelize(database, username, password, options = {}) {
      const db = new Sequelize(
        database,
        username,
        password,
        Object.assign(
          {
            retry: { match: ['SQLITE_BUSY: database is locked'], max: 15 },
          },
          options,
        ),
      )
      return db
    }
  }

  return SequelizeMixed
}

module.exports = sequelizeMix
