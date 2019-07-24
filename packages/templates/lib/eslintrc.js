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
  const {
    additional = {},
    code = true,
    jsdoc = true,
    prettier = true,
    react = false,
    standard = true,
  } = config
  const { extends: extends_ = [], plugins = [], rules = {} } = additional
  return {
    data: {
      extends: [
        react && '@the-/eslint-config-react',
        standard && '@the-/eslint-config-standard',
        standard && '@the-/eslint-config-standard-jsx',
        prettier && '@the-/eslint-config-prettier',
        jsdoc && '@the-/eslint-config-jsdoc',
        code && '@the-/eslint-config-code',
        ...extends_,
      ].filter(Boolean),
      plugins,
      rules,
    },
    force: true,
    mode: '444',
    path: '.eslintrc.yml',
    tmpl: _tmpl('eslintrc.hbs'),
  }
}

module.exports = eslintrc
