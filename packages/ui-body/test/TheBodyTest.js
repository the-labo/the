'use strict'
/**
 * Test for TheBody.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheBody = require('../shim/TheBody').default

describe('the-body', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheBody))
  })
})

/* global describe, before, after, it */
