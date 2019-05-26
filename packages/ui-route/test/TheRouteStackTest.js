'use strict'
/**
 * Test for TheRouteStack.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheRouteStack } = require('../shim/TheRouteStack')

describe('the-route-stack', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheRouteStack))
  })
})

/* global describe, before, after, it */
