'use strict'
/**
 * Test for TheList.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheList = require('../shim/TheList').default

describe('the-list', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheList))
  })
})

/* global describe, before, after, it */
