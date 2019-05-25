'use strict'
/**
 * Test for TheStepStyle.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheStepStyle = require('../shim/TheStepStyle').default

describe('the-step-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheStepStyle))
  })
})

/* global describe, before, after, it */
