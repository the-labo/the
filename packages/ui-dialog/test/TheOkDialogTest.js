'use strict'
/**
 * Test for TheOkDialog.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheOkDialog } = require('../shim/TheOkDialog')

describe('the-ok-dialog', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheOkDialog))
  })
})

/* global describe, before, after, it */
