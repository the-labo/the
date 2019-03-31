/**
 * Test for TheStyle.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheStyle = require('../shim/TheStyle').default

describe('the-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheStyle))
  })
})

/* global describe, before, after, it */
