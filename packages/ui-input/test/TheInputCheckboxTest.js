'use strict'

/**
 * Test for TheInputCheckbox.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheInputCheckbox } = require('../shim/TheInputCheckbox')

describe('the-input-checkbox', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheInputCheckbox))
  })
})

/* global describe, before, after, it */
