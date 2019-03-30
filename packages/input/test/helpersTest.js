/**
 * Test for helpers.
 * Runs with mocha.
 */
'use strict'

const helpers = require('../shim/helpers').default
const React = require('react')
const { ok, equal, deepEqual } = require('assert').strict

describe('helpers', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', () => {
    ok(React.createElement(helpers))
  })
})

/* global describe, before, after, it */
