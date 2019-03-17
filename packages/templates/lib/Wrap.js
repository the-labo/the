/**
 * Wrap
 * @function Wrap
 * @param {Object} config
 * @returns {Object}
 */
'use strict'

const assert = require('assert')
const path = require('path')
const _tmpl = require('./_tmpl')

/** @lends Wrap */
function Wrap(config) {
  const { name } = config
  assert(name, 'name is required')

  const tmpl = _tmpl('Wrap.hbs')
  return {
    data: {
      name: path.basename(name) + '',
    },
    force: false,
    mkdirp: true,
    mode: '644',
    path: `${name}.jsx`,
    tmpl,
  }
}

module.exports = Wrap
