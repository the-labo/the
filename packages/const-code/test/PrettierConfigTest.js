'use strict'

/**
 * Test for PrettierConfig.
 * Runs with mocha.
 */
const {
  strict: { equal, ok },
} = require('assert')
const PrettierConfig = require('../lib/PrettierConfig')

describe('prettier-config', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(PrettierConfig)
    equal(PrettierConfig.semi, false)
  })
})

/* global describe, before, after, it */
