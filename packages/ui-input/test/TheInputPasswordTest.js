'use strict'
/**
 * Test for TheInputPassword.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheInputPassword } = require('../shim/TheInputPassword')

describe('the-input-password', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheInputPassword))
  })
})

/* global describe, before, after, it */
