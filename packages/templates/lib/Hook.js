'use strict'

const assert = require('assert')
const path = require('path')
const _tmpl = require('./_tmpl')

/**
 * Hook
 * @memberof module:@the-/templates
 * @function Hook
 * @param {Object} config
 * @returns {Object}
 */
function Hook(config) {
  let { name } = config
  assert(name, 'name is required')
  name = name.replace(/Hook$/, '')

  const tmpl = _tmpl('Hook.hbs')
  return {
    data: {
      name: `${path.basename(name)}Hook`,
    },
    force: false,
    mode: '644',
    path: `${name}Hook.js`,
    tmpl,
  }
}

module.exports = Hook
