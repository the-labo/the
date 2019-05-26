'use strict'
/**
 * Test for TheContainerStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheContainerStyle } = require('../shim/TheContainerStyle')

describe('the-container-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheContainerStyle))
  })
})

/* global describe, before, after, it */
