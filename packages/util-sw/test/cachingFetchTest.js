/**
 * Test for cachingFetch.
 * Runs with mocha.
 */
'use strict'

const cachingFetch = require('../lib/cachingFetch')
const {ok, equal} = require('assert')
const injectmock = require('injectmock')
const fetch = require('cross-fetch')

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
      match: () => null,
      put: (...a) => {cached.push(a)},
      delete: () => null,
    }
    await cachingFetch(cache, 'http://hoge.com/foo/bar/invalid')
    await cachingFetch(cache, 'http://example.com')
    equal(cached.length, 1)
  })
})

/* global global, describe, before, after, it */
