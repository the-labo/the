'use strict'
/**
 * Test for TheYesNoDialog.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheYesNoDialog = require('../shim/TheYesNoDialog').default

describe('the-yes-no-dialog', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheYesNoDialog))
  })
})

/* global describe, before, after, it */
