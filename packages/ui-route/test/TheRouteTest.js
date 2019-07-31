'use strict'

/**
 * Test for TheRoute.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheRoute } = require('../shim/TheRoute')

describe('the-route', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheRoute))
  })
})

/* global describe, before, after, it */
