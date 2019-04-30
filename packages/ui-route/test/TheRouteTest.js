/**
 * Test for TheRoute.
 * Runs with mocha.
 */
'use strict'

const TheRoute = require('../shim/TheRoute').default
const React = require('react')
const { ok, equal, deepEqual } = require('assert').strict

describe('the-route', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(React.createElement(TheRoute))
  })
})

/* global describe, before, after, it */
