'use strict'

/**
 * Test for statSync.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
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
