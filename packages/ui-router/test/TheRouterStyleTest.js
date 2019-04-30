/**
 * Test for TheRouterStyle.
 * Runs with mocha.
 */
'use strict'

const TheRouterStyle = require('../shim/TheRouterStyle').default
const React = require('react')
const { ok, equal, deepEqual } = require('assert').strict

describe('the-router-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(React.createElement(TheRouterStyle))
  })
})

/* global describe, before, after, it */
