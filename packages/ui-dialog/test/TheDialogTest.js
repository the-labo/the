'use strict'

/**
 * Test for TheDialog.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheDialog } = require('../shim/TheDialog')

describe('the-dialog', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheDialog))
  })
})

/* global describe, before, after, it */
