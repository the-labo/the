/**
 * @memberOf module:@the-/driver-sequelize.constants
 * @name MetaColumnNamesReversed
 * @enum {string}
 */
'use strict'

const MetaColumnNames = require('./MetaColumnNames')

/** @lends module:@the-/driver-sequelize.constantsMetaColumnNamesReversed */
const MetaColumnNamesReversed = Object.entries(MetaColumnNames).reduce(
  (reduced, [k, v]) => ({
    ...reduced,
    [v]: k,
  }),
  {},
)

module.exports = MetaColumnNamesReversed
