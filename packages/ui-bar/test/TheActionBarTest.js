'use strict'

/**
 * Test for TheActionBar.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheActionBar } = require('../shim/TheActionBar')

describe('the-action-bar', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheActionBar))
  })
})

/* global describe, before, after, it */
