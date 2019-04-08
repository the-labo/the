/**
 * Test for TheMapStyle.
 * Runs with mocha.
 */
'use strict'

const TheMapStyle = require('../shim/TheMapStyle').default
const React = require('react')
const { ok, equal, deepEqual } = require('assert').strict

describe('the-map-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(React.createElement(TheMapStyle))
  })
})

/* global describe, before, after, it */
