'use strict'
/**
 * Test for TheCycle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheCycle } = require('../shim/TheCycle')

describe('the-cycle', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheCycle))
  })
})

/* global describe, before, after, it */
