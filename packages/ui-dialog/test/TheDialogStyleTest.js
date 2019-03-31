/**
 * Test for TheDialogStyle.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheDialogStyle = require('../shim/TheDialogStyle').default

describe('the-dialog-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheDialogStyle))
  })
})

/* global describe, before, after, it */
