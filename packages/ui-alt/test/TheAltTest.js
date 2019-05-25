'use strict'
/**
 * Test for TheAlt.
 * Runs with mocha.
 */
const { ok } = require('assert').strict
const React = require('react')
const TheAlt = require('../shim/TheAlt').default

describe('the-alt', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheAlt))
  })
})

/* global describe, before, after, it */
