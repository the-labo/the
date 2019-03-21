/**
 * Test for appCache.
 * Runs with mocha.
 */
'use strict'

const appCache = require('../lib/appCache')
const injectmock = require('injectmock')
const { ok, equal, deepEqual } = require('assert').strict

describe('app-cache', () => {
  before(() => {
    const data = {}
    injectmock(global, 'caches', {
      async keys() {
        return Object.keys(data)
      },
      delete(key) {
        delete data[key]
      },
      open(key) {
        data[key] = data[key] || {}
        return data[key]
      }
    })
  })

  after(() => {
    injectmock.restoreAll()
  })

  it('Do test', async () => {
    await appCache('foo', 'v1')
    deepEqual(await caches.keys(), ['foo@v1'])
    deepEqual(
      await appCache.ofAnotherVersions('foo', 'v2'),
      ['foo@v1']
    )

    await appCache('foo', 'v2')
    deepEqual(await caches.keys(), ['foo@v2'])

    deepEqual(
      await appCache.ofAnotherVersions('foo',),
      ['foo@v2'],
    )

    await appCache('foo', 'v2', { scope: 'x' })
    await appCache('foo', 'v2', { scope: 'y' })
    await appCache('foo', 'v3', { scope: 'x' })
    deepEqual(await caches.keys(), [
      'foo@v2',
      'foo@v2/y',
      'foo@v3/x',
    ])
  })
})

/* global global,describe, before, after, it */
