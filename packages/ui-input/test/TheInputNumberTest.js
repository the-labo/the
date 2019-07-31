'use strict'

/**
 * Test for TheInputNumber.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheInputNumber } = require('../shim/TheInputNumber')

describe('the-input-number', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheInputNumber))
  })
})

/* global describe, before, after, it */
