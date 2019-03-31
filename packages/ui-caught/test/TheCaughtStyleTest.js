/**
 * Test for TheCaughtStyle.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheCaughtStyle = require('../shim/TheCaughtStyle').default

describe('the-caught-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheCaughtStyle))
  })
})

/* global describe, before, after, it */
