/**
 * Test for TheRouteStyle.
 * Runs with mocha.
 */
'use strict'

const TheRouteStyle = require('../shim/TheRouteStyle').default
const React = require('react')
const { ok, equal, deepEqual } = require('assert').strict

describe('the-route-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(React.createElement(TheRouteStyle))
  })
})

/* global describe, before, after, it */
