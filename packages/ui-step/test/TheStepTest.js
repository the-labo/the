'use strict'
/**
 * Test for TheStep.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheStep = require('../shim/TheStep').default

describe('the-step', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheStep))
  })
})

/* global describe, before, after, it */
