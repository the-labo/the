'use strict'
/**
 * Test for TheMenuStyle.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheMenuStyle = require('../shim/TheMenuStyle').default

describe('the-menu-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheMenuStyle))
  })
})

/* global describe, before, after, it */
