'use strict'

/**
 * Test for TheYesNoDialog.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheYesNoDialog } = require('../shim/TheYesNoDialog')

describe('the-yes-no-dialog', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheYesNoDialog))
  })
})

/* global describe, before, after, it */
