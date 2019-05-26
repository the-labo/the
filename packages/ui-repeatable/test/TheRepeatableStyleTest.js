'use strict'
/**
 * Test for TheRepeatableStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheRepeatableStyle } = require('../shim/TheRepeatableStyle')

describe('the-repeatable-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheRepeatableStyle))
  })
})

/* global describe, before, after, it */
