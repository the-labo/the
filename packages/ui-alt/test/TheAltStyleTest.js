'use strict'
/**
 * Test for TheAltStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheAltStyle } = require('../shim/TheAltStyle')

describe('the-alt-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheAltStyle))
  })
})

/* global describe, before, after, it */
