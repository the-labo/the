'use strict'
/**
 * Test for TheBodyStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheBodyStyle } = require('../shim/TheBodyStyle')

describe('the-body-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheBodyStyle))
  })
})

/* global describe, before, after, it */
