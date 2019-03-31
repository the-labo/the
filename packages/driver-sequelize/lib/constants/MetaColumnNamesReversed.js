/**
 * @enum {string} MetaColumnNamesReversed
 */
'use strict'

const MetaColumnNames = require('./MetaColumnNames')

/** @lends MetaColumnNamesReversed */
const MetaColumnNamesReversed = Object.entries(MetaColumnNames).reduce(
  (reduced, [k, v]) => ({
    ...reduced,
    [v]: k,
  }),
  {},
)

module.exports = MetaColumnNamesReversed
