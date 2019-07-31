'use strict'

/**
 * Test for TheMainStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheMainStyle } = require('../shim/TheMainStyle')

describe('the-main-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheMainStyle))
  })
})

/* global describe, before, after, it */
