'use strict'

/**
 * Test for TheBar.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheBar } = require('../shim/TheBar')

describe('the-bar', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheBar))
  })
})

/* global describe, before, after, it */
