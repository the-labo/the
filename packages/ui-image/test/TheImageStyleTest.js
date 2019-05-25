'use strict'
/**
 * Test for TheImageStyle.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheImageStyle = require('../shim/TheImageStyle').default

describe('the-image-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheImageStyle))
  })
})

/* global describe, before, after, it */
