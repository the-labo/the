'use strict'

/**
 * Test for TheCaughtCatcher.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheCaughtCatcher } = require('../shim/TheCaughtCatcher')

describe('the-caught-catcher', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheCaughtCatcher))
  })
})

/* global describe, before, after, it */
