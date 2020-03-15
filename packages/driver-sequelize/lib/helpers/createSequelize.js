'use strict'

const Sequelize = require('sequelize')

function createSequelize(database, username, password, options = {}) {
  const { charset, collate, ...otherOptions } = options
  return new Sequelize(database, username, password, {
    define: { charset, collate },
    retry: { match: ['SQLITE_BUSY: database is locked'], max: 15 },
    ...otherOptions,
  })
}

module.exports = createSequelize
