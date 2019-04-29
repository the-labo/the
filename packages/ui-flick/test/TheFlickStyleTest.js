/**
 * Test for TheFlickStyle.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheFlickStyle = require('../shim/TheFlickStyle').default

describe('the-flick-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheFlickStyle))
  })
})

/* global describe, before, after, it */
