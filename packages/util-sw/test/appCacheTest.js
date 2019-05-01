/**
 * Test for appCache.
 * Runs with mocha.
 */
'use strict'

const { deepEqual } = require('assert').strict
const injectmock = require('injectmock')
const appCache = require('../lib/appCache')

describe('app-cache', () => {
  before(() => {
    const data = {}
    injectmock(global, 'caches', {
      delete(key) {
        delete data[key]
      },
      async keys() {
        return Object.keys(data)
      },
      open(key) {
        data[key] = data[key] || {}
        return data[key]
      },
    })
  })

  after(() => {
    injectmock.restoreAll()
  })

  it('Do test', async () => {
    await appCache('foo', 'v1')
    deepEqual(await caches.keys(), ['foo@v1'])
    deepEqual(await appCache.ofAnotherVersions('foo', 'v2'), ['foo@v1'])

    await appCache('foo', 'v2')
    deepEqual(await caches.keys(), ['foo@v2'])

    deepEqual(await appCache.ofAnotherVersions('foo'), ['foo@v2'])

    await appCache('foo', 'v2', { scope: 'x' })
    await appCache('foo', 'v2', { scope: 'y' })
    await appCache('foo', 'v3', { scope: 'x' })
    deepEqual(await caches.keys(), ['foo@v2', 'foo@v2/y', 'foo@v3/x'])
  })
})

/* global caches, describe, before, after, it */
