'use strict'

const Sequelize = require('sequelize')

/**
 * Mixin of sequelize
 * @memberof module:@the-/driver-sequelize.mixins
 * @function sequelizeMix
 * @param Class
 * @returns {*}
 */
function sequelizeMix(Class) {
  class SequelizeMixed extends Class {
    createSequelize(database, username, password, options = {}) {
      return new Sequelize(
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
    }
  }

  return SequelizeMixed
}

module.exports = sequelizeMix
