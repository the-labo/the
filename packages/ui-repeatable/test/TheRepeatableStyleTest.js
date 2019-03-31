/**
 * Test for TheRepeatableStyle.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheRepeatableStyle = require('../shim/TheRepeatableStyle').default

describe('the-repeatable-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheRepeatableStyle))
  })
})

/* global describe, before, after, it */
