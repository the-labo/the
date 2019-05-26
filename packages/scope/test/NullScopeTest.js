'use strict'
/**
 * Test for NullScope.
 * Runs with mocha.
 */
const {
  strict: { equal },
} = require('assert')
const { TheStore } = require('@the-/store')
const NullScope = require('../lib/scopes/NullScope')

describe('null-scope', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    const store = new TheStore({})
    const n = store.load(NullScope, 'n')

    equal(n.state, null)
  })
})

/* global describe, before, after, it */
