/**
 * Default exports
 * @memberof module:jsdoc
 * @function jsdoc
 * @returns {Jsdoc}
 */
'use strict'

const create = require('./create')
const Jsdoc = require('./Jsdoc')

const lib = create.bind(create)

module.exports = Object.assign(
  lib,
  /** @lends jsdoc */
  {
    Jsdoc,
    create,
  },
)
