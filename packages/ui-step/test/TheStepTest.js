'use strict'
/**
 * Test for TheStep.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheStep } = require('../shim/TheStep')

describe('the-step', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheStep))
  })
})

/* global describe, before, after, it */
