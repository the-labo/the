'use strict'

/**
 * Test for TheRouter.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheRouter } = require('../shim/TheRouter')

describe('the-router', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheRouter))
  })
})

/* global describe, before, after, it */
