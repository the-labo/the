'use strict'

/**
 * Test for TheInputSearch.
 * Runs with mocha.
 */
const {
  strict: { ok },
} = require('assert')
const React = require('react')
const { default: TheInputSearch } = require('../shim/TheInputSearch')

describe('the-input-search', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(React.createElement(TheInputSearch))
  })
})

/* global describe, before, after, it */
