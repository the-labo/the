'use strict'

const { PrettierConfig } = require('@the-/const-code')
const _tmpl = require('./_tmpl')

/**
 * Define bud for prettierrc
 * @memberof module:@the-/templates
 * @function prettierrc
 * @param {Object} config
 * @returns {Object}
 */
function prettierrc(config = {}) {
  return {
    data: {
      values: {
        ...PrettierConfig,
        ...config,
      },
    },
    force: true,
    mode: '444',
    path: '.prettierrc.yml',
    tmpl: _tmpl('prettierrc.hbs'),
  }
}

module.exports = prettierrc
