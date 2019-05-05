/**
 * setting/SettingValues
 * @memberof module:server.constants
 * @protected
 * @namespace SettingValues
 */
'use strict'

const { isProduction } = require('@the-/check')
const theHash = require('@the-/hash')
const theSetting = require('@the-/setting')
const Project = require('../Project')
const setting = theSetting(Project.SETTING_FILE)

const SettingValues = Object.freeze(
  /** @lends module:server.constants.SettingValues */
  {
    ...setting.get(),
  },
)

module.exports = SettingValues

if (!isProduction()) {
  module.exports = theHash.proxy(module.exports, {
    name: 'SettingValues',
    unknownCheck: true,
  })
}
