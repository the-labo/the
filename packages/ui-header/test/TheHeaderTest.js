'use strict'

/**
 * Test for TheHeader.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheHeader } = require('../shim/TheHeader')

describe('the-header', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheHeader))
  })
})

/* global describe, before, after, it */
