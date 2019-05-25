'use strict'
/**
 * Test for TheHead.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheHead = require('../shim/TheHead').default

describe('the-head', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheHead))
  })
})

/* global describe, before, after, it */
