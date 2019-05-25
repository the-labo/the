'use strict'
/**
 * Define bud for eslintrc
 * @memberof module:@the-/templates
 * @function eslintrc
 * @param {Object} config
 * @returns {Object}
 */
const _tmpl = require('./_tmpl')

/** @lends module:@the-/templates.eslintrc */
function eslintrc(config = {}) {
  const { code = true, jsdoc = true, prettier = true, standard = true } = config
  return {
    data: {
      extends: [
        standard && '@the-/eslint-config-standard',
        standard && '@the-/eslint-config-standard-jsx',
        prettier && '@the-/eslint-config-prettier',
        jsdoc && '@the-/eslint-config-jsdoc',
        code && '@the-/eslint-config-code',
      ].filter(Boolean),
    },
    force: true,
    mode: '444',
    path: '.eslintrc.yml',
    tmpl: _tmpl('eslintrc.hbs'),
  }
}

module.exports = eslintrc
