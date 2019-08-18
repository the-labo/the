'use strict'

/**
 * Define bud for bin scripts
 * @memberof module:@the-/templates
 * @function bin
 * @param {Object} config - Configuration
 * @param {Object} config.signature - bin signature.
 * @returns {Object} - Bud object.
 */
const assert = require('assert')
const evaljson = require('evaljson')
const objnest = require('objnest')
const _tmpl = require('./_tmpl')

/** @lends module:@the-/templates.module:@the-/templates.bin */
function bin(config) {
  const { signature } = config
  assert.ok(signature, 'config.signature is required.')
  return {
    data: {
      get signature() {
        return evaljson(objnest.expand(signature))
      },
      done: config.done,
      lib: config.lib || '../lib',
    },
    force: true,
    mkdirp: true,
    mode: '555',
    path: config.path || signature.name,
    tmpl: _tmpl('bin.hbs'),
  }
}

module.exports = bin
