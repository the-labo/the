'use strict'

/**
 * Test for TheButtonStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheButtonStyle } = require('../shim/TheButtonStyle')

describe('the-button-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheButtonStyle))
  })
})

/* global describe, before, after, it */
