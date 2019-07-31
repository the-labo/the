'use strict'

/**
 * Test for TheInputPinCode.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheInputPinCode } = require('../shim/TheInputPinCode')

describe('the-input-pin-code', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheInputPinCode))
  })
})

/* global describe, before, after, it */
