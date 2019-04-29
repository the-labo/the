/**
 * Define bud for bin scripts
 * @memberOf module:@the-/templates
 * @function bin
 * @param {object} config - Configuration
 * @param {object} config.signature - bin signature.
 * @returns {object} - Bud object.
 */
'use strict'

const assert = require('assert')
const evaljson = require('evaljson')
const objnest = require('objnest')
const _tmpl = require('./_tmpl')

/** @lends module:@the-/templates.module:@the-/templates.bin */
function bin(config) {
  let { signature } = config
  assert.ok(signature, 'config.signature is required.')
  return {
    data: {
      done: config.done,
      lib: config.lib || '../lib',
      get signature() {
        return evaljson(objnest.expand(signature))
      },
    },
    force: true,
    mkdirp: true,
    mode: '555',
    path: config.path || signature.name,
    tmpl: _tmpl('bin.hbs'),
  }
}

module.exports = bin
