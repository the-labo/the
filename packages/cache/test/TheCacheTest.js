/**
 * Test for TheCache.
 * Runs with mocha.
 */
'use strict'

const { equal, ok } = require('assert').strict
const TheCache = require('../lib/TheCache')

describe('the-cache', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(TheCache)

    const cache = new TheCache({})

    cache.set('foo', 'bar')
    equal(cache.get('foo'), 'bar')
    cache.reset()
    ok(!cache.get('foo'))
  })
})

/* global describe, before, after, it */
