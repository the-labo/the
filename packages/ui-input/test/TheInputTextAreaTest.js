'use strict'
/**
 * Test for TheInputTextArea.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheInputTextArea } = require('../shim/TheInputTextArea')

describe('the-input-text-area', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheInputTextArea))
  })
})

/* global describe, before, after, it */
