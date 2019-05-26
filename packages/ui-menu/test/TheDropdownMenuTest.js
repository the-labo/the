'use strict'
/**
 * Test for TheDropdownMenu.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheDropdownMenu } = require('../shim/TheDropdownMenu')

describe('the-dropdown-menu', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheDropdownMenu))
  })
})

/* global describe, before, after, it */
