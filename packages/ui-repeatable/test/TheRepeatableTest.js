'use strict'

/**
 * Test for TheRepeatable.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheRepeatable } = require('../shim/TheRepeatable')

describe('the-repeatable', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheRepeatable))
  })
})

/* global describe, before, after, it */
