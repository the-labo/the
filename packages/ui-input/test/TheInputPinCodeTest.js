'use strict'
/**
 * Test for TheInputPinCode.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheInputPinCode = require('../shim/TheInputPinCode').default

describe('the-input-pin-code', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheInputPinCode))
  })
})

/* global describe, before, after, it */
