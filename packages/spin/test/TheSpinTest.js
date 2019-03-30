/**
 * Test for TheSpin.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheSpin = require('../shim/TheSpin').default

describe('the-spin', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheSpin))
  })
})

/* global describe, before, after, it */
