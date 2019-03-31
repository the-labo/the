/**
 * Test for TheButtonStyle.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheButtonStyle = require('../shim/TheButtonStyle').default

describe('the-button-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheButtonStyle))
  })
})

/* global describe, before, after, it */
