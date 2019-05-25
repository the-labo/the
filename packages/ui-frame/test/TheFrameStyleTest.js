'use strict'
/**
 * Test for TheFrameStyle.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheFrameStyle = require('../shim/TheFrameStyle').default

describe('the-frame-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheFrameStyle))
  })
})

/* global describe, before, after, it */
