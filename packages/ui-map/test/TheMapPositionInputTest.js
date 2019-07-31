'use strict'

/**
 * Test for TheMapPositionInput.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheMapPositionInput } = require('../shim/TheMapPositionInput')

describe('the-map-position-input', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheMapPositionInput))
  })
})

/* global describe, before, after, it */
