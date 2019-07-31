'use strict'

/**
 * Test for TheFormBinder.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheFormBinder } = require('../shim/TheFormBinder')

describe('the-form-binder', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheFormBinder))
  })
})

/* global describe, before, after, it */
