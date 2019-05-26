'use strict'
/**
 * Test for TheHeaderStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheHeaderStyle } = require('../shim/TheHeaderStyle')

describe('the-header-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheHeaderStyle))
  })
})

/* global describe, before, after, it */
