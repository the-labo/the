'use strict'
/**
 * Test for TheInputStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheInputStyle } = require('../shim/TheInputStyle')

describe('the-input-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheInputStyle))
  })
})

/* global describe, before, after, it */
