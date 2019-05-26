'use strict'
/**
 * Test for TheMapMarker.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheMapMarker } = require('../shim/TheMapMarker')

describe('the-map-marker', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheMapMarker))
  })
})

/* global describe, before, after, it */
