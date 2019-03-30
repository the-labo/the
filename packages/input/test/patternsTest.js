/**
 * Test for patterns.
 * Runs with mocha.
 */
'use strict'

const patterns = require('../shim/patterns').default
const React = require('react')
const { ok, equal, deepEqual } = require('assert').strict

describe('patterns', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(React.createElement(patterns))
  })
})

/* global describe, before, after, it */
