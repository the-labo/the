/**
 * Test for core-js.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { ok },
} = require('assert')
const coreJs = require('../lib/core-js/core-js')

describe('core-js', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(coreJs)
  })
})

/* global describe, before, after, it */
