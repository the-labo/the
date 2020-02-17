/**
 * @file Test for Proxy.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { ok },
} = require('assert')
const Proxy = require('../../lib/web_worker/Proxy')

describe('proxy', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(Proxy)
    ok(Proxy())
  })
})

/* global describe, before, after, it */
