/**
 * Test for TheIconStyle.
 * Runs with mocha.
 */
'use strict'

const TheIconStyle = require('../shim/TheIconStyle').default
const React = require('react')
const { ok, equal, deepEqual } = require('assert').strict

describe('the-icon-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(React.createElement(TheIconStyle))
  })
})

/* global describe, before, after, it */
