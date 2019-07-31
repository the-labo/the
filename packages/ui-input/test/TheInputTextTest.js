'use strict'

/**
 * Test for TheInputText.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheInputText } = require('../shim/TheInputText')

describe('the-input-text', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheInputText))
  })
})

/* global describe, before, after, it */
