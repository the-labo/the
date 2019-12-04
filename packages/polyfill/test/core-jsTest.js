/**
 * Test for core-js.
 * Runs with mocha.
 */
'use strict'

const coreJs = require('../lib/core-js/core-js')

const { ok, equal, deepEqual } = require('assert').strict

describe('core-js', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', async () => {
    ok(coreJs)
  })
})

/* global describe, before, after, it */
