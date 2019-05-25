'use strict'
/**
 * Test for TheMap.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheMap = require('../shim/TheMap').default

describe('the-map', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheMap))
  })
})

/* global describe, before, after, it */
