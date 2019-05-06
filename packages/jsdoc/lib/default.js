/**
 * Default exports
 * @memberof module:@the-/jsdoc
 * @function jsdoc
 * @returns {JSDoc}
 */
'use strict'

const create = require('./create')
const JSDoc = require('./JSDoc')

const lib = create.bind(create)

module.exports = Object.assign(
  lib,
  /** @lends jsdoc */
  {
    JSDoc,
    create,
  },
)
