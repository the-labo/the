/**
 * Test for TheHeaderStyle.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheHeaderStyle = require('../shim/TheHeaderStyle').default

describe('the-header-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheHeaderStyle))
  })
})

/* global describe, before, after, it */
