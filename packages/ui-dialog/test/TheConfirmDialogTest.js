'use strict'

/**
 * Test for TheConfirmDialog.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheConfirmDialog } = require('../shim/TheConfirmDialog')

describe('the-confirm-dialog', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheConfirmDialog))
  })
})

/* global describe, before, after, it */
