'use strict'
/**
 * Test for ThePaint.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const ThePaint = require('../shim/ThePaint').default

describe('the-paint', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(ThePaint))
  })
})

/* global describe, before, after, it */
