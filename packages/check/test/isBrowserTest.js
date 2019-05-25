'use strict'
/**
 * Test for isBrowser.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const isBrowser = require('../lib/isBrowser')

describe('is-browser', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(!isBrowser())
  })
})

/* global describe, before, after, it */
