/**
 * Test for ThePagerStyle.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const ThePagerStyle = require('../shim/ThePagerStyle').default

describe('the-pager-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(ThePagerStyle))
  })
})

/* global describe, before, after, it */
