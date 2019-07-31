'use strict'

/**
 * Test for isProduction.
 * Runs with mocha.
 */
const {
  strict: { equal },
} = require('assert')
const isProduction = require('../lib/isProduction')

describe('is-production', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    equal(isProduction(), isProduction())
  })
})

/* global describe, before, after, it */
