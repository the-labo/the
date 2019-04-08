/**
 * Test for TheMapPositionInput.
 * Runs with mocha.
 */
'use strict'

const TheMapPositionInput = require('../shim/TheMapPositionInput').default
const React = require('react')
const { ok, equal, deepEqual } = require('assert').strict

describe('the-map-position-input', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(React.createElement(TheMapPositionInput))
  })
})

/* global describe, before, after, it */
