/**
 * Test for TheRouterStyle.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheRouterStyle = require('../shim/TheRouterStyle').default

describe('the-router-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheRouterStyle))
  })
})

/* global describe, before, after, it */
