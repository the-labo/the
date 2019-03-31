/**
 * Test for TheViewStyle.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheViewStyle = require('../shim/TheViewStyle').default

describe('the-view-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheViewStyle))
  })
})

/* global describe, before, after, it */
