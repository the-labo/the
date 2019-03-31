/**
 * Test for TheBarStyle.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheBarStyle = require('../shim/TheBarStyle').default

describe('the-bar-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheBarStyle))
  })
})

/* global describe, before, after, it */
