/**
 * For mapping
 * @function mapping
 * @returns {Object}
 */
'use strict'

const { ok } = require('assert')
const _tmpl = require('./_tmpl')

/** @lends mapping */
function mapping(config) {
  const { cjs = false, mapping, name, requireAs, requirePath } = config
  const ext = cjs ? '.js' : '.mjs'
  const TMPL_PATH = cjs ? _tmpl('cjs_mapping.hbs') : _tmpl('mapping.hbs')
  ok(requirePath, 'requirePath is required')
  ok(requireAs, 'requireAs is required')
  return {
    data: {
      mapping,
      name,
      requireAs,
      requirePath,
    },
    force: true,
    mode: '444',
    path: `${name}${ext}`,
    tmpl: TMPL_PATH,
  }
}

module.exports = mapping
