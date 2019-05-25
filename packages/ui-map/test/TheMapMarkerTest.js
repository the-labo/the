'use strict'
/**
 * Test for TheMapMarker.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheMapMarker = require('../shim/TheMapMarker').default

describe('the-map-marker', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheMapMarker))
  })
})

/* global describe, before, after, it */
