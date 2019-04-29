/**
 * Define bud for eslintrc
 * @memberOf module:@the-/templates
 * @function eslintrc
 * @param {Object} config
 * @returns {Object}
 */
'use strict'

const _tmpl = require('./_tmpl')

/** @lends module:@the-/templates.eslintrc */
function eslintrc(config = {}) {
  return {
    data: {},
    force: true,
    mode: '444',
    path: `.eslintrc.yml`,
    tmpl: _tmpl('eslintrc.hbs'),
  }
}

module.exports = eslintrc
