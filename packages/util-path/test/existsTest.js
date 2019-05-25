'use strict'
/**
 * Test for exists.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const exists = require('../lib/helpers/exists')

describe('exists', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(await exists(__filename))
    ok(exists.sync(__filename))
  })
})

/* global describe, before, after, it */
