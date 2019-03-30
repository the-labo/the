/**
 * Test for TheHeaderStyle.
 * Runs with mocha.
 */
'use strict'

const TheHeaderStyle = require('../shim/TheHeaderStyle').default
const React = require('react')
const { ok, equal, deepEqual } = require('assert').strict

describe('the-header-style', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(React.createElement(TheHeaderStyle))
  })
})

/* global describe, before, after, it */
