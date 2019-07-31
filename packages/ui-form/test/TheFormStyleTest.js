'use strict'

/**
 * Test for TheFormStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheFormStyle } = require('../shim/TheFormStyle')

describe('the-form-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheFormStyle))
  })
})

/* global describe, before, after, it */
