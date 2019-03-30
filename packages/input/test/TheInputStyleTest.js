/**
 * Test for TheInputStyle.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheInputStyle = require('../shim/TheInputStyle').default

describe('the-input-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheInputStyle))
  })
})

/* global describe, before, after, it */
