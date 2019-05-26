'use strict'
/**
 * Define bud for mapping
 * @memberof module:@the-/templates
 * @function mapping
 * @returns {Object}
 */
const {
  strict: { ok },
} = require('assert')
const _tmpl = require('./_tmpl')

/** @lends module:@the-/templates.mapping */
function mapping(config) {
  const {
    cjs = false,
    mapping,
    memberof = 'mappings',
    name,
    requireAs,
    requirePath,
  } = config
  const ext = cjs ? '.js' : '.mjs'
  const TMPL_PATH = cjs ? _tmpl('cjs_mapping.hbs') : _tmpl('mapping.hbs')
  ok(requirePath, 'requirePath is required')
  ok(requireAs, 'requireAs is required')
  return {
    data: {
      mapping,
      memberof,
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
