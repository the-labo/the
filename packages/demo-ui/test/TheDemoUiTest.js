'use strict'
/**
 * Test for TheDemoUi.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheDemoUi = require('../shim/TheDemoUi').default

describe('the-demo-ui', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheDemoUi))
  })
})

/* global describe, before, after, it */
