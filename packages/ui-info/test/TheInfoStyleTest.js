/**
 * Test for TheInfoStyle.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheInfoStyle = require('../shim/TheInfoStyle').default

describe('the-info-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheInfoStyle))
  })
})

/* global describe, before, after, it */
