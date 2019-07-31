'use strict'

/**
 * Test for TheLink.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheLink } = require('../shim/TheLink')

describe('the-link', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheLink))
  })
})

/* global describe, before, after, it */
