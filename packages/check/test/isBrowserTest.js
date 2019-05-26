'use strict'
/**
 * Test for isBrowser.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const isBrowser = require('../lib/isBrowser')

describe('is-browser', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(!isBrowser())
  })
})

/* global describe, before, after, it */
