'use strict'

/**
 * Test for TheCaughtStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheCaughtStyle } = require('../shim/TheCaughtStyle')

describe('the-caught-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheCaughtStyle))
  })
})

/* global describe, before, after, it */
