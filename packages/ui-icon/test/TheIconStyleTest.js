'use strict'

/**
 * Test for TheIconStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheIconStyle } = require('../shim/TheIconStyle')

describe('the-icon-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheIconStyle))
  })
})

/* global describe, before, after, it */
