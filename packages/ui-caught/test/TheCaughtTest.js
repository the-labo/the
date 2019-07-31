'use strict'

/**
 * Test for TheCaught.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheCaught } = require('../shim/TheCaught')

describe('the-caught', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheCaught))
  })
})

/* global describe, before, after, it */
