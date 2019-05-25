'use strict'
/**
 * Test for TheInputNumber.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheInputNumber = require('../shim/TheInputNumber').default

describe('the-input-number', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheInputNumber))
  })
})

/* global describe, before, after, it */
