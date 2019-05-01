/**
 * Test for TheRouteStyle.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheRouteStyle = require('../shim/TheRouteStyle').default

describe('the-route-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheRouteStyle))
  })
})

/* global describe, before, after, it */
