'use strict'
/**
 * Test for patterns.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: patterns } = require('../shim/patterns')

describe('patterns', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(patterns))
  })
})

/* global describe, before, after, it */
