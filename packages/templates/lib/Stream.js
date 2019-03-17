/**
 * Stream
 * @function Stream
 * @param {Object} config
 * @returns {Object}
 */
'use strict'

const assert = require('assert')
const path = require('path')
const _tmpl = require('./_tmpl')

/** @lends Stream */
function Stream(config) {
  const { cjs = false } = config
  let { name } = config
  assert(name, 'name is required')
  name = name.replace(/Stream$/, '')

  const tmpl = _tmpl(cjs ? 'cjs_Stream.hbs' : 'Stream.hbs')
  return {
    data: {
      name: path.basename(name) + 'Stream',
    },
    force: false,
    mode: '644',
    path: `${name}Stream.js`,
    tmpl,
  }
}

module.exports = Stream
