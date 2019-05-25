'use strict'
/**
 * Test for TheActionBar.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheActionBar = require('../shim/TheActionBar').default

describe('the-action-bar', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheActionBar))
  })
})

/* global describe, before, after, it */
