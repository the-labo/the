'use strict'
/**
 * Test for TheSpinStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheSpinStyle } = require('../shim/TheSpinStyle')

describe('the-spin-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheSpinStyle))
  })
})

/* global describe, before, after, it */
