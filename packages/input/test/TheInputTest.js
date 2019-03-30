/**
 * Test for TheInput.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheInput = require('../shim/TheInput').default

describe('the-input', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheInput))
  })
})

/* global describe, before, after, it */
