/**
 * Test for TheFlickStyle.
 * Runs with mocha.
 */
'use strict'

const TheFlickStyle = require('../shim/TheFlickStyle').default
const React = require('react')
const { ok, equal, deepEqual } = require('assert').strict

describe('the-flick-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(React.createElement(TheFlickStyle))
  })
})

/* global describe, before, after, it */
