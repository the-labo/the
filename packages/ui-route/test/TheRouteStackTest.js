/**
 * Test for TheRouteStack.
 * Runs with mocha.
 */
'use strict'

const TheRouteStack = require('../shim/TheRouteStack').default
const React = require('react')
const { ok, equal, deepEqual } = require('assert').strict

describe('the-route-stack', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(React.createElement(TheRouteStack))
  })
})

/* global describe, before, after, it */
