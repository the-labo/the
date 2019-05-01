/**
 * Stateful
 * @memberof module:@the-/templates
 * @function Stateful
 * @param {Object} config
 * @returns {Object}
 */
'use strict'

const assert = require('assert')
const path = require('path')
const _tmpl = require('./_tmpl')

/** @lends module:@the-/templates.Stateful */
function Stateful(config) {
  const { memberOf = 'ui.stateful', name } = config
  assert(name, 'name is required')

  const tmpl = _tmpl('Stateful.hbs')
  return {
    data: {
      contextPath: path.relative(name, 'context'),
      memberOf,
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
