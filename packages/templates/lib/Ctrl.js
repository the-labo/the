/**
 * Ctrl
 * @function Ctrl
 * @param {Object} config
 * @returns {Object}
 */
'use strict'

const assert = require('assert')
const path = require('path')
const _tmpl = require('./_tmpl')

/** @lends Ctrl */
function Ctrl(config) {
  const { cjs = false } = config
  let { name } = config
  assert(name, 'name is required')
  name = name.replace(/Ctrl$/, '')

  const tmpl = _tmpl(cjs ? 'cjs_Ctrl.hbs' : 'Ctrl.hbs')
  return {
    data: {
      name: path.basename(name) + 'Ctrl',
    },
    force: false,
    mode: '644',
    path: `${name}Ctrl.js`,
    tmpl,
  }
}

module.exports = Ctrl