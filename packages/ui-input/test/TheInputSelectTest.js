'use strict'

/**
 * Test for TheInputSelect.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheInputSelect } = require('../shim/TheInputSelect')

describe('the-input-select', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheInputSelect))
  })
})

/* global describe, before, after, it */
