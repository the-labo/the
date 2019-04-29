/**
 * Test for TheMapStyle.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheMapStyle = require('../shim/TheMapStyle').default

describe('the-map-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheMapStyle))
  })
})

/* global describe, before, after, it */
