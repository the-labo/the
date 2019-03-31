/**
 * Test for TheBodyStyle.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheBodyStyle = require('../shim/TheBodyStyle').default

describe('the-body-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheBodyStyle))
  })
})

/* global describe, before, after, it */
