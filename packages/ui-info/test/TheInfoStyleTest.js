'use strict'
/**
 * Test for TheInfoStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheInfoStyle } = require('../shim/TheInfoStyle')

describe('the-info-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheInfoStyle))
  })
})

/* global describe, before, after, it */
