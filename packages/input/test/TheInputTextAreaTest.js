/**
 * Test for TheInputTextArea.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheInputTextArea = require('../shim/TheInputTextArea').default

describe('the-input-text-area', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheInputTextArea))
  })
})

/* global describe, before, after, it */
