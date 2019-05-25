'use strict'
/**
 * Test for TheRepeatable.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheRepeatable = require('../shim/TheRepeatable').default

describe('the-repeatable', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheRepeatable))
  })
})

/* global describe, before, after, it */
