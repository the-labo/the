'use strict'

/**
 * Test for TheStepStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheStepStyle } = require('../shim/TheStepStyle')

describe('the-step-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheStepStyle))
  })
})

/* global describe, before, after, it */
