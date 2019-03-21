/**
 * Test for statSync.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert')
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
