'use strict'

/**
 * Test for isProduction.
 * Runs with mocha.
 */
const {
  strict: { equal, ok },
} = require('assert')
const isProduction = require('../lib/isProduction')

describe('is-production', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    equal(isProduction(), isProduction())
    const {
      env: { NODE_ENV },
    } = process
    process.env.NODE_ENV = 'production'
    ok(isProduction())
    process.env.NODE_ENV = 'test'
    ok(!isProduction())
    process.env.NODE_ENV = NODE_ENV
  })
})

/* global describe, before, after, it */
