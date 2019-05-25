'use strict'
/**
 * Test for TheSpinStyle.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheSpinStyle = require('../shim/TheSpinStyle').default

describe('the-spin-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheSpinStyle))
  })
})

/* global describe, before, after, it */
