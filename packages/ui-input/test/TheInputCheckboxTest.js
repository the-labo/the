/**
 * Test for TheInputCheckbox.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheInputCheckbox = require('../shim/TheInputCheckbox').default

describe('the-input-checkbox', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheInputCheckbox))
  })
})

/* global describe, before, after, it */
