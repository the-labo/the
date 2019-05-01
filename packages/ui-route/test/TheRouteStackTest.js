/**
 * Test for TheRouteStack.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheRouteStack = require('../shim/TheRouteStack').default

describe('the-route-stack', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheRouteStack))
  })
})

/* global describe, before, after, it */
