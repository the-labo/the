'use strict'
/**
 * Test for TheDemoUi.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheDemoUi } = require('../shim/TheDemoUi')

describe('the-demo-ui', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheDemoUi))
  })
})

/* global describe, before, after, it */
