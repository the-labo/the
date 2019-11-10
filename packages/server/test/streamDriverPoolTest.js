/**
 * Test for streamDriverPool.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { ok },
} = require('assert')
const streamDriverPool = require('../lib/streaming/streamDriverPool')

describe('stream-driver-pool', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const pool = streamDriverPool()
    ok(pool)
    pool.setInstance('c1', 's1', {})
    ok(pool.hasInstance('c1', 's1'))
    ok(!pool.hasInstance('c2', 's1'))
    ok(!pool.hasInstance('c1', 's2'))
    pool.delInstance('c1', 's1')
    ok(!pool.hasInstance('c1', 's1'))
    pool.cleanup('c1')
  })
})

/* global describe, before, after, it */
