'use strict'
/**
 * Alias of {@link module:@the-/db.create}
 * @memberof module:@the-/db
 * @function default
 */
const create = require('./create')
const helpers = require('./helpers')
const TheDB = require('./TheDB')

const lib = create.bind(create)

module.exports = Object.assign(lib, {
  TheDB,
  helpers,
})
