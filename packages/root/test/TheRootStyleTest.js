/**
 * Test for TheRootStyle.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheRootStyle = require('../shim/TheRootStyle').default

describe('the-root-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheRootStyle))
  })
})

/* global describe, before, after, it */
