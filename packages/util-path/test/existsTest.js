'use strict'

/**
 * Test for exists.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
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
