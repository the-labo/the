/**
 * Test for TheFormBinder.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheFormBinder = require('../shim/TheFormBinder').default

describe('the-form-binder', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheFormBinder))
  })
})

/* global describe, before, after, it */
