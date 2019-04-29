/**
 * Define bud for LICENSE
 * @memberOf module:@the-/templates
 * @function License
 * @param {object} config - Configuration.
 * @param {string} config.type - Type of license.
 * @param {number} config.year - Copy right year.
 * @param {string} config.holder - License holder name.
 * @returns {object} - Bud object.
 */
'use strict'

const assert = require('assert')
const _tmpl = require('./_tmpl')

/** @lends module:@the-/templates.License */
function License(config) {
  assert.ok(config.type, 'config.type is required.')
  assert.ok(config.holder, 'config.holder is required.')
  return {
    data: {
      holder: config.holder,
      year: config.year || new Date().getFullYear(),
    },
    force: true,
    mode: '444',
    path: 'LICENSE',
    tmpl: _tmplForType(String(config.type).trim()),
  }
}

function _tmplForType(type) {
  switch (type) {
    case 'Apache-2.0':
    case 'Apache2':
    case 'APACHE-2.0':
    case 'APACHE2':
      return _tmpl('LICENSE_Apache-2.0.hbs')
    case 'mit':
    case 'MIT':
      return _tmpl('LICENSE_MIT.hbs')
    default:
      throw new Error(`Unknown license type: ${type}`)
  }
}

module.exports = License
