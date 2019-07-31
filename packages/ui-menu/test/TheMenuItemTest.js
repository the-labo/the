'use strict'

/**
 * Test for TheMenuItem.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheMenuItem } = require('../shim/TheMenuItem')

describe('the-menu-item', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheMenuItem))
  })
})

/* global describe, before, after, it */
