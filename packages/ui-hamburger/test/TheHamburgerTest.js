'use strict'

/**
 * Test for TheHamburger.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheHamburger } = require('../shim/TheHamburger')

describe('the-hamburger', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheHamburger))
  })
})

/* global describe, before, after, it */
