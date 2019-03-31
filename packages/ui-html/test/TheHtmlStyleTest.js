/**
 * Test for TheHtmlStyle.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheHtmlStyle = require('../shim/TheHtmlStyle').default

describe('the-html-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheHtmlStyle))
  })
})

/* global describe, before, after, it */
