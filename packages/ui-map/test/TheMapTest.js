/**
 * Test for TheMap.
 * Runs with mocha.
 */
'use strict'

const TheMap = require('../shim/TheMap').default
const React = require('react')
const { ok, equal, deepEqual } = require('assert').strict

describe('the-map', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(React.createElement(TheMap))
  })
})

/* global describe, before, after, it */
