/**
 * Test for TheMainStyle.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheMainStyle = require('../shim/TheMainStyle').default

describe('the-main-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheMainStyle))
  })
})

/* global describe, before, after, it */
