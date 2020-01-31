'use strict'

/**
 * @file Test for FormatCache.
 * Runs with mocha.
 */
const {
  strict: { equal },
} = require('assert')
const FormatCache = require('../lib/helpers/FormatCache')

describe('format-cache', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    const filename = `${__dirname}/../tmp/cache/testing-cache.json`
    const cache = new FormatCache(filename)
    await cache.set('a', 1)
    await cache.flush()
    await cache.sync()
    const cache2 = new FormatCache(filename)
    await cache2.sync()
    equal(await cache.get('a'), 1)
  })
})

/* global describe, before, after, it */
