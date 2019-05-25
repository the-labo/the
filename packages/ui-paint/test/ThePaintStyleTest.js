'use strict'
/**
 * Test for ThePaintStyle.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const ThePaintStyle = require('../shim/ThePaintStyle').default

describe('the-paint-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(ThePaintStyle))
  })
})

/* global describe, before, after, it */
