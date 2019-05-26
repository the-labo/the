'use strict'
/**
 * Test for TheQueue.
 * Runs with mocha.
 */
const asleep = require('asleep')
const {
  strict: { deepEqual, equal, ok },
} = require('assert')
const TheQueue = require('../lib/TheQueue')

describe('the-queue', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(TheQueue)
    const queue = new TheQueue()
    ok(queue)
    const results = []
    queue.push(async () => {
      await asleep(100)
      results.push('a1')
    })
    queue.push(async () => {
      await asleep(1)
      results.push('a2')
    })
    deepEqual(results, [])
    queue.start()
    equal(queue.metrics.finishedCount, 0)
    await queue.wait()
    deepEqual(results, ['a1', 'a2'])
    equal(queue.metrics.finishedCount, 2)
    await queue.push(async () => {
      await asleep(100)
      results.push('a3')
    })
  })
})

/* global describe, before, after, it */
