'use strict'

/**
 * Test for TheSection.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheSection } = require('../shim/TheSection')

describe('the-section', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheSection))
  })
})

/* global describe, before, after, it */
