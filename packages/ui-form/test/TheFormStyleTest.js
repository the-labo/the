/**
 * Test for TheFormStyle.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheFormStyle = require('../shim/TheFormStyle').default

describe('the-form-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheFormStyle))
  })
})

/* global describe, before, after, it */
