'use strict'

/**
 * Stream
 * @memberof module:@the-/templates
 * @function Stream
 * @param {Object} config
 * @returns {Object}
 */
const assert = require('assert')
const path = require('path')
const _tmpl = require('./_tmpl')

/** @lends module:@the-/templates.Stream */
function Stream(config) {
  const { cjs = false, memberof = 'streams' } = config
  let { name } = config
  assert(name, 'name is required')
  name = name.replace(/Stream$/, '')

  const tmpl = _tmpl(cjs ? 'cjs_Stream.hbs' : 'Stream.hbs')
  return {
    data: {
      memberof,
      name: `${path.basename(name)}Stream`,
    },
    force: false,
    mode: '644',
    path: `${name}Stream.js`,
    tmpl,
  }
}

module.exports = Stream
