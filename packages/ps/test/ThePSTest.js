/**
 * Test for ThePS.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
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
