/**
 * Test for TheFooterStyle.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheFooterStyle = require('../shim/TheFooterStyle').default

describe('the-footer-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheFooterStyle))
  })
})

/* global describe, before, after, it */
