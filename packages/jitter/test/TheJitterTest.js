'use strict'
/**
 * Test for TheJitter.
 * Runs with mocha.
 */
const { equal, ok } = require('assert').strict
const TheJitter = require('../lib/TheJitter')

describe('the-jitter', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(TheJitter)

    const jitter = new TheJitter({
      max: 2,
      maxInterval: 100,
    })
    ok(jitter.durationToWait() === 0)
    jitter.incrementCount()
    jitter.incrementCount()
    equal(jitter.count, 2)
    ok(jitter.durationToWait() > 0)

    jitter.decrementCount()
    jitter.decrementCount()
    equal(jitter.count, 0)
    ok(jitter.durationToWait() === 0)
    await jitter.handle(async () => {
      equal(jitter.count, 1)
      await jitter.handle(async () => {
        equal(jitter.count, 2)
      })
    })
    await jitter.wait()
    equal(jitter.count, 0)
    jitter.incrementCount()
    jitter.resetCount()
    ok(jitter.durationToWait() === 0)
    equal(jitter.count, 0)
  })
})

/* global describe, before, after, it */
