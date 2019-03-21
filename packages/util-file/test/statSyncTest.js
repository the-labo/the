/**
 * Test for statSync.
 * Runs with mocha.
 */
'use strict'

const statSync = require('../lib/statSync')
const {ok, equal} = require('assert')

describe('stat-sync', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(statSync(__filename))
    ok(!statSync('___/hoge/'))
  })
})

/* global describe, before, after, it */
