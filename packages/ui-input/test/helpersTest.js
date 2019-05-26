'use strict'
/**
 * Test for helpers.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: helpers } = require('../shim/helpers')

describe('helpers', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(helpers))
  })
})

/* global describe, before, after, it */
