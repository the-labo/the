/**
 * Stateless
 * @function Stateless
 * @param {Object} config
 * @returns {Object}
 */
'use strict'

const assert = require('assert')
const path = require('path')
const _tmpl = require('./_tmpl')

/** @lends Stateless */
function Stateless(config) {
  const { name } = config
  assert(name, 'name is required')

  const tmpl = _tmpl('Stateless.hbs')
  return {
    data: {
      contextPath: path.relative(name, 'context'),
      name: path.basename(name) + '',
    },
    force: false,
    mkdirp: true,
    mode: '644',
    path: `${name}.jsx`,
    tmpl,
  }
}

module.exports = Stateless