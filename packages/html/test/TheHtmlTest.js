/**
 * Test for TheHtml.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const TheHtml = require('../shim/TheHtml').default

describe('the-html', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheHtml))
  })
})

/* global describe, before, after, it */
