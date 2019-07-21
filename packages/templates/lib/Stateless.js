'use strict'
/**
 * Stateless
 * @memberof module:@the-/templates
 * @function Stateless
 * @param {Object} config
 * @returns {Object}
 */
const assert = require('assert')
const path = require('path')
const _tmpl = require('./_tmpl')

/** @lends module:@the-/templates.Stateless */
function Stateless(config) {
  const { memberOf = config.memberof || 'ui.stateless', name } = config
  assert(name, 'name is required')

  const tmpl = _tmpl('Stateless.hbs')
  return {
    data: {
      contextPath: path.relative(name, 'context'),
      memberOf,
      name: `${path.basename(name)}`,
    },
    force: false,
    mkdirp: true,
    mode: '644',
    path: `${name}.jsx`,
    tmpl,
  }
}

module.exports = Stateless
