'use strict'
/**
 * Test for TheMenuItem.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheMenuItem = require('../shim/TheMenuItem').default

describe('the-menu-item', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheMenuItem))
  })
})

/* global describe, before, after, it */
