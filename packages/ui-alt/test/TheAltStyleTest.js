'use strict'
/**
 * Test for TheAltStyle.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheAltStyle = require('../shim/TheAltStyle').default

describe('the-alt-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheAltStyle))
  })
})

/* global describe, before, after, it */
