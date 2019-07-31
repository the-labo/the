'use strict'

/**
 * Test for TheRefresher.
 * Runs with mocha.
 */
const asleep = require('asleep')
const {
  strict: { ok },
} = require('assert')
const TheRefresher = require('../lib/TheRefresher')

describe('the-refresher', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(TheRefresher)

    const refresher = new TheRefresher((v) => console.log(v), { interval: 10 })

    refresher.start()
    refresher.request('hoge')
    ok(refresher.has('hoge'))
    refresher.request('fuge')

    await asleep(100)
    ok(!refresher.has('hoge'))
    refresher.stop()
  })
})

/* global describe, before, after, it */
