'use strict'
/**
 * Test for TheForm.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheForm = require('../shim/TheForm').default

describe('the-form', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheForm))
  })
})

/* global describe, before, after, it */
