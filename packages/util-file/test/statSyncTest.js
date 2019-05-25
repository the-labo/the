'use strict'
/**
 * Test for statSync.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const statSync = require('../lib/statSync')

describe('stat-sync', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(statSync(__filename))
    ok(!statSync('___/hoge/'))
  })
})

/* global describe, before, after, it */
