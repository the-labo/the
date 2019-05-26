'use strict'
/**
 * Test for TheInputRange.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheInputRange } = require('../shim/TheInputRange')

describe('the-input-range', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheInputRange))
  })
})

/* global describe, before, after, it */
