'use strict'
/**
 * Test for TheLinkStyle.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheLinkStyle = require('../shim/TheLinkStyle').default

describe('the-link-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheLinkStyle))
  })
})

/* global describe, before, after, it */
