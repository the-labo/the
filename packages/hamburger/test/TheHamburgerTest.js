/**
 * Test for TheHamburger.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheHamburger = require('../shim/TheHamburger').default

describe('the-hamburger', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheHamburger))
  })
})

/* global describe, before, after, it */
