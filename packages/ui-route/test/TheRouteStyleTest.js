'use strict'
/**
 * Test for TheRouteStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheRouteStyle } = require('../shim/TheRouteStyle')

describe('the-route-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheRouteStyle))
  })
})

/* global describe, before, after, it */
