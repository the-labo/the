'use strict'

/**
 * Test for TheFooterStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheFooterStyle } = require('../shim/TheFooterStyle')

describe('the-footer-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheFooterStyle))
  })
})

/* global describe, before, after, it */
