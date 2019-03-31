/**
 * Test for helpers.
 * Runs with mocha.
 */
'use strict'

const { ok } = require('assert').strict
const React = require('react')
const helpers = require('../shim/helpers').default

describe('helpers', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(helpers))
  })
})

/* global describe, before, after, it */
