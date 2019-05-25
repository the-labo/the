'use strict'
/**
 * Test for TheConfirmDialog.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheConfirmDialog = require('../shim/TheConfirmDialog').default

describe('the-confirm-dialog', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheConfirmDialog))
  })
})

/* global describe, before, after, it */
