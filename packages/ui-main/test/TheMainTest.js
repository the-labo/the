'use strict'
/**
 * Test for TheMain.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheMain = require('../shim/TheMain').default

describe('the-main', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheMain))
  })
})

/* global describe, before, after, it */
