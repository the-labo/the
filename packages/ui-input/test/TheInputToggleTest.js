'use strict'

/**
 * Test for TheInputToggle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheInputToggle } = require('../shim/TheInputToggle')

describe('the-input-toggle', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheInputToggle))
  })
})

/* global describe, before, after, it */
