'use strict'
/**
 * Test for TheStepBar.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheStepBar = require('../shim/TheStepBar').default

describe('the-step-bar', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheStepBar))
  })
})

/* global describe, before, after, it */
