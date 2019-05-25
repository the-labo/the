'use strict'
/**
 * Test for TheCaught.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheCaught = require('../shim/TheCaught').default

describe('the-caught', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheCaught))
  })
})

/* global describe, before, after, it */
