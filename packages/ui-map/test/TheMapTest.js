'use strict'
/**
 * Test for TheMap.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheMap } = require('../shim/TheMap')

describe('the-map', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheMap))
  })
})

/* global describe, before, after, it */
