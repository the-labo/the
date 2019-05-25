'use strict'
/**
 * Test for patterns.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const patterns = require('../shim/patterns').default

describe('patterns', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(patterns))
  })
})

/* global describe, before, after, it */
