/**
 * @file Test for listen.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { ok },
} = require('assert')
const listen = require('../../lib/web_worker/listen')

describe('listen', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(listen)
  })
})

/* global describe, before, after, it */
