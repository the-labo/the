/**
 * Stateful
 * @function Stateful
 * @param {Object} config
 * @returns {Object}
 */
'use strict'

const assert = require('assert')
const path = require('path')
const _tmpl = require('./_tmpl')

/** @lends Stateful */
function Stateful(config) {
  const { name } = config
  assert(name, 'name is required')

  const tmpl = _tmpl('Stateful.hbs')
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

module.exports = Stateful
