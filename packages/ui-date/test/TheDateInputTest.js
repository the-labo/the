/**
 * Test for TheDateInput.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheDateInput } = require('../shim/TheDateInput')

describe('the-date-input', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    ok(TheDateInput)
    ok(React.createElement(TheDateInput))
  })
})

/* global describe, before, after, it */
