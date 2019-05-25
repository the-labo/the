'use strict'
/**
 * Test for TheDropdownMenu.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheDropdownMenu = require('../shim/TheDropdownMenu').default

describe('the-dropdown-menu', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheDropdownMenu))
  })
})

/* global describe, before, after, it */
