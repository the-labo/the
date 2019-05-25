'use strict'
/**
 * Test for TheRouter.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheRouter = require('../shim/TheRouter').default

describe('the-router', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheRouter))
  })
})

/* global describe, before, after, it */
