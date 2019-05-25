'use strict'
/**
 * Test for TheIconStyle.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheIconStyle = require('../shim/TheIconStyle').default

describe('the-icon-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheIconStyle))
  })
})

/* global describe, before, after, it */
