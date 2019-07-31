'use strict'

/**
 * Test for TheDialogStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheDialogStyle } = require('../shim/TheDialogStyle')

describe('the-dialog-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheDialogStyle))
  })
})

/* global describe, before, after, it */
