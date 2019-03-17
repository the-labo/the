/**
 * Define a bud for bin.
 * @memberof module:ape-tmpl/lib
 * @function binBud
 * @param {object} config - Configuration
 * @param {object} signature - Bin signature.
 * @returns {object} - Bud object.
 */
'use strict'

const assert = require('assert')
const evaljson = require('evaljson')
const objnest = require('objnest')
const _tmpl = require('./_tmpl')

function binBud(config) {
  let signature = config.signature
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

module.exports = binBud
