'use strict'

/**
 * Test for TheContainer.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheContainer } = require('../shim/TheContainer')

describe('the-container', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheContainer))
  })
})

/* global describe, before, after, it */
