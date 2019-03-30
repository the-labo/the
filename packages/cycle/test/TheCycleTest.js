/**
 * Test for TheCycle.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheCycle = require('../shim/TheCycle').default

describe('the-cycle', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheCycle))
  })
})

/* global describe, before, after, it */
