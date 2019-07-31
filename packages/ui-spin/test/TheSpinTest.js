'use strict'

/**
 * Test for TheSpin.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheSpin } = require('../shim/TheSpin')

describe('the-spin', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheSpin))
  })
})

/* global describe, before, after, it */
