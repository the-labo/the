/**
 * Hook
 * @memberOf module:@the-/templates
 * @function Hook
 * @param {Object} config
 * @returns {Object}
 */
'use strict'

const assert = require('assert')
const path = require('path')
const _tmpl = require('./_tmpl')

/** @lends module:@the-/templates.Hook */
function Hook(config) {
  const { cjs = false } = config
  let { name } = config
  assert(name, 'name is required')
  name = name.replace(/Hook$/, '')

  const tmpl = _tmpl(cjs ? 'cjs_Hook.hbs' : 'Hook.hbs')
  return {
    data: {
      name: path.basename(name) + 'Hook',
    },
    force: false,
    mode: '644',
    path: `${name}Hook.js`,
    tmpl,
  }
}

module.exports = Hook
