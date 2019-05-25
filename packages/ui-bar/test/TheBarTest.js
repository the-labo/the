'use strict'
/**
 * Test for TheBar.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheBar = require('../shim/TheBar').default

describe('the-bar', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheBar))
  })
})

/* global describe, before, after, it */
