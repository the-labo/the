'use strict'

/**
 * Test for TheStepBar.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheStepBar } = require('../shim/TheStepBar')

describe('the-step-bar', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheStepBar))
  })
})

/* global describe, before, after, it */
