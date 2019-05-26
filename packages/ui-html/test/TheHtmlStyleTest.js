'use strict'
/**
 * Test for TheHtmlStyle.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheHtmlStyle } = require('../shim/TheHtmlStyle')

describe('the-html-style', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheHtmlStyle))
  })
})

/* global describe, before, after, it */
