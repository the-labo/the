'use strict'
/**
 * Test for TheViewStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheViewStyle } = require('../shim/TheViewStyle')

describe('the-view-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheViewStyle))
  })
})

/* global describe, before, after, it */
