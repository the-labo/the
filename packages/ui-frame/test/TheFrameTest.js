'use strict'
/**
 * Test for TheFrame.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheFrame = require('../shim/TheFrame').default

describe('the-frame', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheFrame))
  })
})

/* global describe, before, after, it */
