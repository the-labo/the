/**
 * Test for ThePaintStyle.
 * Runs with mocha.
 */
'use strict'

const ThePaintStyle = require('../shim/ThePaintStyle').default
const React = require('react')
const { ok, equal, deepEqual } = require('assert').strict

describe('the-paint-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(React.createElement(ThePaintStyle))
  })
})

/* global describe, before, after, it */
