/**
 * Project
 * @memberof module:server.constants
 * @namespace Project
 */
'use strict'

const path = require('path')
const { isProduction } = require('@the-/check')
const theHash = require('@the-/hash')
const pkg = require('../../package')
const pkgShortName = pkg.name.split('/').pop()
const BASE_DIR = path.dirname(require.resolve('../../package'))

/** @lends module:server.constants.Project */
const Project = {
  BASE_DIR,
  // TODO
  NAME: pkg.name,
  SECRET_MASTER_PASSWORD: `${pkgShortName}-xxxxxxxxxxxxxxxxxx`,
  SECRETS_FILE: require.resolve('./secret/Secrets.json'),
  SETTING_FILE: path.join(BASE_DIR, 'var/app/setting.json'),
  SHORT_NAME: pkg.name.split('/').pop(),
  VERSION: pkg.version,
}

module.exports = Project

if (!isProduction()) {
  module.exports = theHash.proxy(module.exports, {
    name: 'Project',
    unknownCheck: true,
  })
}
