/**
 * @file Test for Proxy.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { deepEqual, ok },
} = require('assert')
const Proxy = require('../../lib/worker_threads/Proxy')

describe('proxy', function() {
  this.timeout(40000)
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(Proxy)
    const proxy = Proxy(require.resolve('../../misc/mocks/mockWorkerThread.js'))
    ok(proxy)
    const encoded = await proxy.encode({
      x: 1,
    })
    ok(encoded)
    const decoded = await proxy.decode(encoded)
    deepEqual(decoded, { x: 1 })
    await proxy.close()
  })
})

/* global describe, before, after, it */
