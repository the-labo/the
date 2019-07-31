'use strict'

/**
 * Test for TheLinkStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheLinkStyle } = require('../shim/TheLinkStyle')

describe('the-link-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheLinkStyle))
  })
})

/* global describe, before, after, it */
