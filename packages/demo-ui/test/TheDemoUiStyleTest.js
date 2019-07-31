'use strict'

/**
 * Test for TheDemoUiStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheDemoUiStyle } = require('../shim/TheDemoUiStyle')

describe('the-demo-ui-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheDemoUiStyle))
  })
})

/* global describe, before, after, it */
