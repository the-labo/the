/**
 * Test for TheMapMarker.
 * Runs with mocha.
 */
'use strict'

const TheMapMarker = require('../shim/TheMapMarker').default
const React = require('react')
const { ok, equal, deepEqual } = require('assert').strict

describe('the-map-marker', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(React.createElement(TheMapMarker))
  })
})

/* global describe, before, after, it */
