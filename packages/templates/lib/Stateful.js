'use strict'

const assert = require('assert')
const path = require('path')
const _tmpl = require('./_tmpl')

/**
 * Stateful
 * @memberof module:@the-/templates
 * @function Stateful
 * @param {Object} config
 * @returns {Object}
 */
function Stateful(config) {
  const { memberOf = config.memberof || 'ui.stateful', name } = config
  assert(name, 'name is required')

  const tmpl = _tmpl('Stateful.hbs')
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

module.exports = Stateful
