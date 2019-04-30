/**
 * Alias {@function default
 * @link module:@the-/setting.create}
 */
'use strict'

const create = require('./create')
const helpers = require('./helpers')
const TheSetting = require('./TheSetting')

const lib = create.bind(create)

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.TheSetting = TheSetting
exports.create = create
exports.helpers = helpers

module.exports = Object.assign(lib, {
  TheSetting,
  create,
  helpers,
})
