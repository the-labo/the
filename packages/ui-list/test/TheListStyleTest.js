'use strict'
/**
 * Test for TheListStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheListStyle } = require('../shim/TheListStyle')

describe('the-list-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheListStyle))
  })
})

/* global describe, before, after, it */
