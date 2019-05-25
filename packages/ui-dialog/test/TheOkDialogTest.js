'use strict'
/**
 * Test for TheOkDialog.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheOkDialog = require('../shim/TheOkDialog').default

describe('the-ok-dialog', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheOkDialog))
  })
})

/* global describe, before, after, it */
