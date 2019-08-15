'use strict'

const assert = require('assert')
const path = require('path')
const _tmpl = require('./_tmpl')

/**
 * Define bud for server controller
 * @memberof module:@the-/templates
 * @function Ctrl
 * @param {Object} config
 * @param {boolean} [config.cjs=false]
 * @param {string} [config.name]
 * @returns {Object}
 */
function Ctrl(config) {
  const { cjs = false, memberof = 'controllers' } = config
  let { name } = config
  assert(name, 'name is required')
  name = name.replace(/Ctrl$/, '')

  const tmpl = _tmpl(cjs ? 'cjs_Ctrl.hbs' : 'Ctrl.hbs')
  return {
    data: {
      memberof,
      name: `${path.basename(name)}Ctrl`,
    },
    force: false,
    mode: '644',
    path: `${name}Ctrl.js`,
    tmpl,
  }
}

module.exports = Ctrl
