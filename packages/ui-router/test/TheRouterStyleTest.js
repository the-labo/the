'use strict'

/**
 * Test for TheRouterStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheRouterStyle } = require('../shim/TheRouterStyle')

describe('the-router-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheRouterStyle))
  })
})

/* global describe, before, after, it */
