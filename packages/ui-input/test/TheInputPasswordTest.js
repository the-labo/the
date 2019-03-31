/**
 * Test for TheInputPassword.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheInputPassword = require('../shim/TheInputPassword').default

describe('the-input-password', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheInputPassword))
  })
})

/* global describe, before, after, it */
