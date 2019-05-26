'use strict'
/**
 * Test for TheForm.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheForm } = require('../shim/TheForm')

describe('the-form', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheForm))
  })
})

/* global describe, before, after, it */
