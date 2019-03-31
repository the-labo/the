/**
 * Test for TheCaughtCatcher.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheCaughtCatcher = require('../shim/TheCaughtCatcher').default

describe('the-caught-catcher', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheCaughtCatcher))
  })
})

/* global describe, before, after, it */
