'use strict'

/**
 * Test for TheCache.
 * Runs with mocha.
 */
const {
  strict: { equal, ok },
} = require('assert')
const TheCache = require('../lib/TheCache')

describe('the-cache', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(TheCache)

    const cache = new TheCache({})

    cache.set('foo', 'bar')
    equal(cache.get('foo'), 'bar')
    cache.reset()
    ok(!cache.get('foo'))

    equal(await cache.for('x', () => 'This is x'), 'This is x')
    equal(cache.get('x'), 'This is x')
  })
})

/* global describe, before, after, it */
