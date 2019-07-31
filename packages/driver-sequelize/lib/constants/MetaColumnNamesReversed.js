'use strict'

/**
 * @memberof module:@the-/driver-sequelize.constants
 * @enum {string}
 * @name MetaColumnNamesReversed
 */
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
