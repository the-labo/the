'use strict'
/**
 * Test for TheHamburgerStyle.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheHamburgerStyle = require('../shim/TheHamburgerStyle').default

describe('the-hamburger-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheHamburgerStyle))
  })
})

/* global describe, before, after, it */
