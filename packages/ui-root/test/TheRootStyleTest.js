'use strict'

/**
 * Test for TheRootStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheRootStyle } = require('../shim/TheRootStyle')

describe('the-root-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheRootStyle))
  })
})

/* global describe, before, after, it */
