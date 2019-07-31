'use strict'

/**
 * Test for ThePagerStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: ThePagerStyle } = require('../shim/ThePagerStyle')

describe('the-pager-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(ThePagerStyle))
  })
})

/* global describe, before, after, it */
