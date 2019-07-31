'use strict'

/**
 * Test for ThePS.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const ThePS = require('../lib/ThePS')

describe('the-ps', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(ThePS)

    const ps = new ThePS(`${__dirname}/../tmp/hoge/foo.pid`, {
      logEnabled: true,
    })

    await ps.acquire({
      killPolicy: 'force',
    })
  })
})

/* global describe, before, after, it */
