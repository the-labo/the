'use strict'
/**
 * Test for TheHamburgerStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheHamburgerStyle } = require('../shim/TheHamburgerStyle')

describe('the-hamburger-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheHamburgerStyle))
  })
})

/* global describe, before, after, it */
