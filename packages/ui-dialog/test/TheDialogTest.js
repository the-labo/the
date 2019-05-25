'use strict'
/**
 * Test for TheDialog.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheDialog = require('../shim/TheDialog').default

describe('the-dialog', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheDialog))
  })
})

/* global describe, before, after, it */
