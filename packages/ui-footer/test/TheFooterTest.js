'use strict'
/**
 * Test for TheFooter.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheFooter = require('../shim/TheFooter').default

describe('the-footer', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheFooter))
  })
})

/* global describe, before, after, it */
