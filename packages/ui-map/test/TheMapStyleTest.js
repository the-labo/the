'use strict'
/**
 * Test for TheMapStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheMapStyle } = require('../shim/TheMapStyle')

describe('the-map-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheMapStyle))
  })
})

/* global describe, before, after, it */
