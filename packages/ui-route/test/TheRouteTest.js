/**
 * Test for TheRoute.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheRoute = require('../shim/TheRoute').default

describe('the-route', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheRoute))
  })
})

/* global describe, before, after, it */
