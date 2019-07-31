'use strict'

/**
 * Test for TheInput.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheInput } = require('../shim/TheInput')

describe('the-input', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheInput))
  })
})

/* global describe, before, after, it */
