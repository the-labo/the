'use strict'
/**
 * Test for TheHead.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheHead } = require('../shim/TheHead')

describe('the-head', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheHead))
  })
})

/* global describe, before, after, it */
