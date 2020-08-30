'use strict'

/**
 * Test for TheCache.
 * Runs with mocha.
 */
const asleep = require('asleep')
const {
  strict: { equal, ok },
} = require('assert')
const TheCache = require('../lib/TheCache')

describe('the-cache', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(TheCache)

    const cache = new TheCache({
      maxAge: 1,
    })

    cache.set('foo', 'bar')
    equal(cache.get('foo'), 'bar')
    cache.reset()
    ok(!cache.get('foo'))
    let accessCount = 0
    equal(
      await cache.for('x', () => {
        accessCount++
        return 'This is x'
      }),
      'This is x',
    )
    equal(cache.get('x'), 'This is x')
    cache.get('x')
    cache.get('x')
    cache.get('x')
    cache.get('x')
    equal(accessCount, 1)
    await asleep(50)
  })

  it('withLocalStorage', () => {
    global.window = {
      localStorage: {},
    }
    const cache = TheCache.withLocalStorage('hoge', {
      maxAge: 1,
    })
    equal(!!cache, true)
    cache.set('x', 1)
    equal(cache.get('x'), 1)
    delete global.window
  })
})

/* global describe, before, after, it */
