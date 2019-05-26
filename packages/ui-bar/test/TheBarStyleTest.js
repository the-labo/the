'use strict'
/**
 * Test for TheBarStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheBarStyle } = require('../shim/TheBarStyle')

describe('the-bar-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheBarStyle))
  })
})

/* global describe, before, after, it */
