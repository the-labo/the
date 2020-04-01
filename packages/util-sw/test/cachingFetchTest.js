'use strict'

/**
 * Test for cachingFetch.
 * Runs with mocha.
 */
const {
  strict: { equal },
} = require('assert')
const fetch = require('cross-fetch')
const injectmock = require('injectmock')
const cachingFetch = require('../lib/cachingFetch')

describe('caching-fetch', function () {
  this.timeout(8000)
  before(() => {
    injectmock(global, 'fetch', fetch)
  })

  after(() => {
    injectmock.restoreAll()
  })

  it('Do test', async () => {
    const cached = []
    const cache = {
      delete: () => null,
      match: () => null,
      put: (...a) => {
        cached.push(a)
      },
    }
    await cachingFetch(cache, 'http://hoge.com/foo/bar/invalid')
    await cachingFetch(cache, 'http://example.com')
    equal(cached.length, 1)
  })
})

/* global describe, before, after, it */
