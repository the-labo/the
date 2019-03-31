/**
 * Test for TheInputText.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheInputText = require('../shim/TheInputText').default

describe('the-input-text', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheInputText))
  })
})

/* global describe, before, after, it */
